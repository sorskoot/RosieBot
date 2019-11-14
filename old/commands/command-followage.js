const request = require('request');

module.exports =
    (twitchClient, target, context) => {
        getUsersFollows(context['user-id'], context['room-id']).then(followage => {
            if (followage) {
                let followdate = new Date(followage.followed_at);
                twitchClient.say(target, `${context['display-name']}, you are following since ${followdate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`);
            } else {
                twitchClient.say(target, `Mmm. You don't seem to be member of the fam, @${context['display-name']}. Maybe you should start following today FrankerZ`);
            }
        })
    }

function getUsersFollows(userId, roomId) {
    return new Promise((res, rej) => {
        request.get(`https://api.twitch.tv/helix/users/follows?from_id=${userId}&to_id=${roomId}`, {
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
            res(JSON.parse(body).data[0]);
        });
    });
}