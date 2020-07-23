
(function () {
    const RoyaltyFreePlanet = 'bXYj0o4nSgQ';
    const Monstafluff = 'Oxj2EAr256Y';


    let currentVolume = 100;
    let socket = io('http://twich.c0dr.nl:7532');

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function play(videoId) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                enablejsapi: 1,
                fs: 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    window.onYouTubeIframeAPIReady = () => {
        play(Monstafluff);
    }
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    //var done = false;
    function onPlayerStateChange(event) {
       
    }
    function stopVideo() {
        player.stopVideo();
    }

    /**
        * Handles a response coming from the socket
        * @param {string|object} command The command with possible value
        */
    function handleSocketCommands(command) {

        if (command === 'play') {
            player.playVideo()
            //play(command.play);//'lTTajzrSkCw'

        }
        else if (command === 'pause') {
            player.pauseVideo();
        }
        else if (command === 'reload') {
            document.location.reload(true);
        } else if (command.hasOwnProperty('volume')) {
            lerp(currentVolume, command.volume, 20, 1500, (x) => {
                player.setVolume(clamp(x, 0, 100));
            });
            currentVolume = command.volume;
        }
    }

    socket.on('player', handleSocketCommands);

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

    function clamp(val, min, max) {
        return Math.min(Math.max(min, val), max);
    };
})();



