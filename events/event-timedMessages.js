const allMessages = [
    { msg: "Help spread the word of Sorskoot and click to Tweet! https://ctt.ac/fU1I6" },
    { disabled: true, msg: "Want to subscribe to Sorskoot? It's $4.99 / $9.99 / $24.99 (prices on desktop page, local taxes may apply) a month! https://subs.twitch.tv/Sorskoot" },
    { msg: "If you like to support Sorskoot AND look cool at the same time! You should check out his merch at https://shop.spreadshirt.net/sorskoot" },
    { msg: "Come join our discord so we can hang out in between streams. https://discord.gg/J3j43p8" },
    { msg: "There are a lot of fun commands to use in chat. Check the list at https://github.com/sorskoot/RosieBot/blob/master/commands.md" },
    { msg: "All the VODs and more can be viewed at Sorskoot's YouTube channel. http://youtube.com/user/Sorskoot?sub_confirmation=1" },
    { msg: "Did you know Sorskoot also has a website! Go check it out, https://timmykokke.com. Well after the steam of course! " },
    { msg: "Feel free to ask Sorskoot questions, he's glad to help... " },
    { msg: "Want to know what happend during the steam? Sorskoot is keeping notes and shares them at https://timmykokke.com/twitch/" },
    { msg: "There are over 30 sound effects you can trigger in chat! For example !badumts or !justdoit. The whole list is at https://github.com/sorskoot/RosieBot/blob/master/commands.md#sound-fx" },
    { msg: "See that light behind Sorkoot? You can control that with !light" },
    { msg: "If you are enjoing the stream don't forget to hit the follow button ;)" },
    { msg: "Got suggestions? Feel free to drop them in chat and Sorskoot will add them to the notes." },
    { disabled: true, msg: "Clip of the audio app" },
    { disabled: false, msg: "Cheering BleedingHeart Bits give 10% extra now!", startDate: new Date("jul 1 2019"), endDate: new Date("jul 26 2019") },
    { disabled: false, msg: "Use code 'SALEJULY' for a 10% discount at the merch store https://shop.spreadshirt.net/sorskoot", startDate: "jul 20 2019", endDate: "jul 23 2019" },
    { disabled: true, msg: "Stream Setup Blogpost" }
];

let counter = 1;
let scheduled = false;

const MessageCount = 10;

module.exports =
    (twitchClient, target) => {
        if (counter >= MessageCount) {
            if (scheduled) return;
            scheduled = true;
            let now = new Date();

            let messages = allMessages.filter(m => !m.disabled &&
                (((!!m.startDate && m.startDate < now) || !m.startDate) &&
                    ((!!m.endDate && m.endDate > now) || !m.endDate)));

            let timer = ~~(Math.random() * 120 + 60);

            let message = messages[~~(messages.length * Math.random())].msg;
            console.log(`scheduleing message (${timer}s) "${message}"`)

            setTimeout(() => {
                twitchClient.say(target, message);
                counter = 1;
                scheduled = false;
            }, timer * 1000);
        } else {
            counter++;
        }
    }

