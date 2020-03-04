(function () {

    let music;
    let debug = !!~document.location.href.indexOf('debug');

    const WIDTH = 1080;
    const HEIGHT = 128;
    const BARWIDTH = 40;

    const SMOOTHING = 0.4;
    const FFT_SIZE = 2048;

    let socket = io('http://localhost:7532');
    let filesocket = io('http://localhost:7535');
    // socket.emit('websocket-trigger',["player-remote","next"]);
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioCtx.createAnalyser();

    let currentVolume = 1;

    analyser.connect(audioCtx.destination);
    analyser.minDecibels = -80;
    analyser.maxDecibels = 0;
    analyser.fftSize = FFT_SIZE;
    let freqs = new Uint8Array(analyser.frequencyBinCount);
    let times = new Uint8Array(analyser.frequencyBinCount);

    let currentPlayer = 0;
    let player = document.getElementById('player');
    let canvas = document.querySelector('.visualizer');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    var drawContext = canvas.getContext('2d');

    let audio = [
        createAudioElement(0),
        //    createAudioElement(1)
    ];

    function clamp(val, min, max) {
        return Math.min(Math.max(min, val), max);
    };

    player.appendChild(audio[0]);
    //player.appendChild(audio[1]);

    //audio[currentPlayer].ontimeupdate = onTimeUpdate;
    audio[currentPlayer].onended = onEnded;

    transitioning = false;

    requestAnimationFrame(draw);

    // let buffers = 2;
    // let drawbuff = [];
    // for (let i = 0; i < buffers; i++) {
    //     drawbuff.push(new Array(FFT_SIZE).fill(0));
    // }

    fetch('music.json')
        .then(m => m.json())
        .then(s => music = s)
        .then(() => next());

    function draw() {
        analyser.smoothingTimeConstant = SMOOTHING;
        analyser.fftSize = FFT_SIZE;

        // Get the frequency data from the currently playing music
        analyser.getByteFrequencyData(freqs);
        analyser.getByteTimeDomainData(times);
        // shift everything to the left:
        drawContext.globalCompositeOperation = 'lighter';
        let imageData = drawContext.getImageData(0, 0, WIDTH, HEIGHT);
        for
            (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i + 3] = Math.max(imageData.data[i + 3] - 1, 5) - 5;
        }
        drawContext.putImageData(imageData, 0, 0);
        // now clear the right-most pixels:
        //drawContext.clearRect(0, 1, WIDTH, 2);

        // drawContext.clearRect(0, 0, WIDTH, HEIGHT)
        let barWidth = BARWIDTH;
        let currentValue = 0;
        let stepsize = analyser.frequencyBinCount / (WIDTH / barWidth);
        for (var i = 0; i < WIDTH / barWidth; i++) {
            var value = freqs[~~currentValue];
            var percent = value / 256;
            var height = HEIGHT * percent;
            var offset = HEIGHT - height - 1;
            if (percent > 0) {
                // var barWidth = WIDTH / analyser.frequencyBinCount;
                var hue = percent * 255;

                drawContext.fillStyle = `rgba(${hue},${hue / 8},${hue / 2 + 128}, 15%)`;
                drawContext.shadowBlur = 4;
                drawContext.shadowColor = `rgba(${hue},${hue / 8},${hue},15%)`;
                drawContext.fillRect(i * barWidth + 2, (~~(offset / 16) * 16), barWidth - 4, 14);
                currentValue += stepsize;
            }
        }

        // }
        requestAnimationFrame(draw);
    }

    function onTimeUpdate(evt) {
        if (+evt.srcElement.dataset.id !== currentPlayer) return;

        let remaining = audio[currentPlayer].duration - (audio[currentPlayer].currentTime);
        if (remaining < 5) {
            console.log(~~remaining, ~~audio[currentPlayer].duration, ~~audio[currentPlayer].currentTime);
            if (!transitioning) {
                console.log("transition started to ", (currentPlayer + 1) % 2);
                audio[(currentPlayer + 1) % 2].play();
                transitioning = true;
            }
            const volume = Math.min(Math.max(remaining / 5.0, 0), 1);
            audio[(currentPlayer + 1) % 2].volume = 1 - volume;
            audio[currentPlayer].volume = volume;
        }

        if (remaining <= 0 && transitioning) {
            console.log(~~remaining, ~~audio[currentPlayer].duration, ~~audio[currentPlayer].currentTime);
            next();
        }

    }
    function onEnded() {
        next();
    }

    socket.on('player', handleSocketCommands);

    /**
     * Handles a response coming from the socket
     * @param {string|object} command The command with possible value
     */
    function handleSocketCommands(command) {

        if (command === 'play') {
            audio[currentPlayer].volume = 1;
            audio[currentPlayer].play().catch(r => {
                console.log(r);
            });
        }
        else if (command === 'pause') audio[currentPlayer].pause();
        else if (command === 'reload') document.location.reload(true);
        else if (command === 'next') {
            //audio[(currentPlayer + 1) % 2].play();
            next();
            //audio[currentPlayer].volume = 1;
        } else if (command.hasOwnProperty('volume')) {
            lerp(currentVolume * 100, command.volume, 20, 1500, (x) => {
                audio[currentPlayer].volume = clamp(x / 100, 0, 1);
            });
            currentVolume = command.volume / 100;
        }
    }
    filesocket.on('file-response',data=>{
        var blob = new Blob([new Uint8Array(data, 0, data.length)], { type: 'audio/mpeg' });

        player.removeChild(audio[currentPlayer]);
        audio[currentPlayer] = createAudioElement(currentPlayer);
        player.appendChild(audio[currentPlayer]);

        audio[currentPlayer].src = URL.createObjectURL(blob);
        audio[currentPlayer].play();
        audio[currentPlayer].onended = onEnded;
    })
    async function next() {
        let path = `${music.path}/${music.songs[~~(Math.random() * music.songs.length)]}`;
        filesocket.emit('request-file', path);
        return;
        let f = await fetch(`${music.path}/${encodeURI(music.songs[~~(Math.random() * music.songs.length)])}`)
    
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function createAudioElement(id) {
        const audioElement = document.createElement('audio');
        audioElement.controls = debug;
        audioElement.volume = currentVolume;
        audioElement.dataset.id = id;
        audioElement.src = '';
        audioElement.preload = "auto";
        audioElement.style.backgroundColor = getRandomColor();
        let track = audioCtx.createMediaElementSource(audioElement);
        track.connect(analyser);
        return audioElement;
    }

    function lerp(from, to, steps, time, callback) {
        let x = delay(0);
        let stepsize = (to - from) / steps;
        if (stepsize > 0) {
            for (let i = from; i < to; i += stepsize) {
                x = x.then(() => delay(time / steps))
                    .then(() => callback(i))
            }
        } else {
            for (let i = from; i > to; i += stepsize) {
                x = x.then(() => delay(time / steps))
                    .then(() => callback(i))
            }
        }
        x = x.then(() => callback(to));
    }

    function delay(time) {
        return new Promise(res => {
            setTimeout(res, time);
        })
    }
})();



