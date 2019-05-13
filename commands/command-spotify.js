const request = require('request');

const URL = "https://api.spotify.com/v1/me/player/currently-playing";

module.exports = {
    spotifySong: (twitchClient, target, context) => {
        request.get(URL, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.SPOTIFY_TOKEN}`
            }
        },
        (err,resp,body)=>{
            console.log(body);
            let trackinfo = JSON.parse(body);
            const artists = trackinfo.item.artists.map(a=>a.name).join(', ');
            twitchClient.say(target,`The current song playing is '${ trackinfo.item.name}' by ${artists}.`);
        })
    }
}