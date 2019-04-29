const request = require('request');
const moment = require('moment');

module.exports =
    (twitchClient, target, context, name) => {
        validate(name).then(user=>{
            twitchClient.say(target,`You should check out ${user.display_name}'s stream at https://twitch.tv/${user.login} !`);
        })
        .catch(err=>{
            twitchClient.say(target,`I could not find ${name}, did you write it correctly?`);
        })
    }

function validate(name){
    return new Promise((res, rej) => {
        request.get(`https://api.twitch.tv/helix/users?login=${name}`, {
            headers: {
                'client-id': process.env.TWITCH_CLIENTID
            }
        }, function (error, response, body) {
            if (!!error) {
                rej(error);
                return;
            }
            if (response.statusCode != 200) {
                rej(`statuscode: ${response.statusCode}`);
                return;
            }            
            const userData = JSON.parse(body);
             if(!userData.data.length){
                 rej('user not found');
                 return;
             }
            res(userData.data[0]);
        });
    });
}