module.exports = {

    infoIde: (twitchClient, target) => {
        twitchClient.say(target, "Sorskoot is using VSCode most of the time. He is using the SynthWave '84 theme at the moment (https://marketplace.visualstudio.com/items?itemName=RobbOwen.synthwave-vscode).");
    },
    infoApp: (twitchClient, target) => {
        twitchClient.say(target, "Here's a demo of the app Sorskoot is building: https://clips.twitch.tv/JazzySuccessfulOrcaDeIlluminati");
    },
    infoGeekCode: (twitchClient, target) => {
        twitchClient.say(target, "What's you Geek Code? Sorskoot's is: GIT d->--- s:+ a C+++ UL- P--? L !E W+++ !N !o K--? w++++ !O !M !V PS++(+++) PE- Y++ PGP+ t+>+++ 5->++ X++ R tv? b DI+ D+++ G++>++++ e++ h r+++ y+++");
    },
    infoSfx: (twitchClient, target)=>{
        twitchClient.say(target, "You can find all sound FX that can be played on the stream at http://bit.ly/sfxCommands Have fun!");
    },
    infoJs13k:(twitchClient, target)=>{
        twitchClient.say(target, "Js13k games is a yearly competition where you have to build a JavaScript game in 13KB zipped. Sorskoot is competing in the WebXR category. More info at https://js13kgames.com");
    },
}