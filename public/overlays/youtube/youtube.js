let socket = io('http://localhost:7532');

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

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
//var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        player = undefined;
        const elem = document.createElement('div')
        elem.id='player';
        document.body.append(elem)
        
        
        //   setTimeout(stopVideo, 6000);
        // done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}


socket.on('youtube-player', handleSocketCommands);

/**
    * Handles a response coming from the socket
    * @param {string|object} command The command with possible value
    */
function handleSocketCommands(command) {

    if (command.hasOwnProperty('play')) {
        play(command.play);//'lTTajzrSkCw'
    }
    else if (command === 'stop'){
        player = undefined;
        document.getElementById('player').remove()
        const elem = document.createElement('div')
        elem.id='player';
        document.body.append(elem)
        //'<div id="player"></div>';
    };
}