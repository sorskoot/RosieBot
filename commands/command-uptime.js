const request = require('request');
const moment = require('moment');

module.exports =
    (twitchClient, target) => {
        getMyStream().then((body)=>{
            const uptime = moment.utc(moment.utc() - moment.utc(body.started_at));            
            if(uptime.hour() == 0){
                twitchClient.say(target,`Sorskoot is streaming for ${uptime.minute()} minute${uptime.minute()==1?'':'s'}.`);
            }
            else{
                twitchClient.say(target,`Sorskoot is streaming for ${uptime.hour()} hour${uptime.hour()==1?'':'s'} ${uptime.minute()} minute${uptime.minute()==1?'':'s'}.`);
            }                    
        });
    }

function getMyStream() {
    return new Promise((res, rej) => {
        request.get('https://api.twitch.tv/helix/streams?user_login=sorskoot', {
            headers: {
                'client-id': process.env.TWITCH_CLIENTID
            }
        }, function (error, response, body) {
            if (!!error) {
                rej(error);
            }
            if (response.statusCode != 200) {
                rej(`statuscode: ${response.statusCode}`);
            }
            res(JSON.parse(body).data[0]);
        });
    });
}