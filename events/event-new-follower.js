const fs = require('fs');

const file = 'session_most_recent_follower.txt';
const folder = process.env.MUXY_FOLDER;

module.exports =
    (twitchClient, target) => {
        // fs.watchFile(`${folder}\\${file}`, () => {
        //     fs.readFile(`${folder}\\${file}`, 'utf8', (err, follower)=> {
        //         if(!!err){
        //             console.log(err);
        //             return;
        //         }
        //         if(follower!==""){
        //             twitchClient.say(target, `Hi @${follower}! Welcome to the coder-sphere.`);
        //         }
        //     })           
        // })            
    }