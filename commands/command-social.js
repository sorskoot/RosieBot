module.exports = {

    socialTwitter: (twitchClient, target) => {
        twitchClient.say(target, "You can follow @Sorskoot on twitter at https://twitter.com/sorskoot");
    },
    socialYoutube: (twitchClient, target) => {
        twitchClient.say(target, "You can watch @Sorskoot's videos on https://youtube.com/c/sorskoot");
    },
    socialDiscord: (twitchClient, target) => {
        twitchClient.say(target, "Come have a chat at the Discord at https://discord.gg/J3j43p8");
    },
    socialGit: (twitchClient, target) => {
        twitchClient.say(target, "You can find all the code over at https://github.com/sorskoot");
    },
    socialInsta: (twitchClient, target) => {
        twitchClient.say(target, "Have a look at Sorskoot's 360 tiny planets at https://www.instagram.com/sorskoot360/");
    },
    socialMerch: (twitchClient, target) => {
        twitchClient.say(target, "You can buy awesome Sorskoot merch at https://shop.spreadshirt.net/sorskoot/ !");
    },
}
