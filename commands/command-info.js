module.exports = {

    infoIde: (twitchClient, target) => {
        twitchClient.say(target, "Sorskoot is using VSCode most of the time. He is using the SynthWave '84 theme at the moment (https://marketplace.visualstudio.com/items?itemName=RobbOwen.synthwave-vscode).");
    },
    infoApp: (twitchClient, target) => {
        twitchClient.say(target, "Here's a demo of the app Sorskoot is building: https://clips.twitch.tv/JazzySuccessfulOrcaDeIlluminati");
    }
}