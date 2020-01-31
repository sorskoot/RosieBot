(function () {
    let socket = io('http://localhost:7532');
    let emotes = document.querySelector("#emotes");

    socket.on('render emotes', function (msg) {
        for (emote in msg) {
            for(let i = 0 ; i<msg[emote].length;i++){
                let img = document.createElement('img');
                img.style.position = "absolute";
                img.style.left = ~~(Math.random()*800)+'px';
                const y = ~~(Math.random() * 300);
                img.style.top = y +'px';
                img.setAttribute('src', `https://static-cdn.jtvnw.net/emoticons/v1/${emote}/2.0`);
                emotes.appendChild(img);

                explode(img, y, ~~(Math.random()*50)*50);
            }
        }
    });

    function explode(target, y, delay) {
        setTimeout(function () {
            let expl = new ImgExplode(target);
            expl.explode({
                maxWidth: 25,
                minWidth: 10,
                radius: 631,
                release: true,
                fadeTime:4,
                recycle: false,
                explodeTime: 1280,
                canvas: true,
                round: false,
                maxAngle: 360,
                gravity: 5,
                groundDistance: 500-y,
            });
        }, 200+delay)
    }
    


})();