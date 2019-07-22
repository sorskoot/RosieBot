// - Check if the message contains one or more links. It it does check and respond with titles.
// - Ignore links to twitch

let cheerio = require('cheerio');
let request = require('request');

let regex = /(((http|https):\/\/)?((\w+\.)+\w+))/gim;

function containsLink(message) {
    regex.lastIndex = 0;
    return regex.test(message);
}

function validateLinks(twitchClient, target, context, msg) {
    regex.lastIndex = 0;
    var m = null;

    let getTitles = [];
    do {
        m = regex.exec(msg)
        if (m) {
            getTitles.push(GetTitle(m[0]));
        }
    } while (m);
    Promise.all(getTitles).then(titles => {
        titles = titles.filter(x => !!x);
        if (titles.length > 0) {
            twitchClient.say(target, `Thank you @${context['display-name']}! You just shared ${titles.length > 1 ? 'links' : 'a link'} to '${titles.join('\' and \'')}' with us.`);
        }
    }, e => console.log(e))

}

function GetTitle(url) {
    if (!url.startsWith("http")) {
        url = 'https://' + url;
    }
    return new Promise((res, rej) => {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                res($("head>title").text());
            } else {
                res(undefined); // just ignore... 
            }
        });
    });
}

module.exports = { containsLink, validateLinks };
