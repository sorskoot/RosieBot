const request = require('request');
const URL =
    `https://${process.env.AZUREKB_NAME}.azurewebsites.net/qnamaker/knowledgebases/${process.env.AZUREKB_ID}/generateAnswer`


module.exports =
    (twitchClient, target, msg) => {
        return new Promise(res => request.post(URL, {
                headers: {
                    "Authorization": `EndpointKey ${process.env.AZUREKB_ENDPOINT_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "question": msg
                })
            },
            (err,response,body) => {
                res(JSON.parse(body));
            })).then(r=>{
                if(!!r.answers.length){
                    if(!r.answers[0].answer.startsWith('!') && r.answers[0].score > 30){
                       twitchClient.say(target,r.answers[0].answer);
                    }
                    return r.answers[0].answer;
                }
            })
    };