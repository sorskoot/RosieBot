const defaultMessage = 'It\'s one of the live coders! Hello __NAME__! ';

const Shoutouties = [
    { name: 'fetishlace', message: 'Hi fetishlace! Good to see you again!' },
    { name: 'fetii1', message: 'Hi fetii! Great to have you deconcentrating sorskoot!' },
    { name: "baldbeardedbuilder", message:"Hey look! It's the bald bearded builder! Hi Michael!" },
    { name: "JitterTed" },
    { name: "davidortinau" },
    { name: "Syropian" },
    { name: "cldubya" },
    { name: "DrMikachu" },
    { name: "LizeLive" },
    { name: "FullStackLive" },
    { name: "Talk2meGooseman" },
    { name: "funfunfunction" },
    { name: "Lana_Lux" },
    { name: "JamesMontemagno" },
    { name: "CodeRushed" },
    { name: "cpayette" },
    { name: "Clarkio" },
    { name: "Kasuken" },
    { name: "Alca" },
    { name: "AtomikJaye" },
    { name: "DevChatter" },
    { name: "BrandonSatrom" },
    { name: "Instafluff" },
    { name: "QualityCoder" },
    { name: "javidx9" },
    { name: "developersgarage" },
    { name: "IAmFletcher_" },
    { name: "illuminatedspace" },
    { name: "Chiefcll" },
    { name: "potatoqualitee" },
    { name: "noopkat" },
    { name: "csharpfritz" },
    { name: "SudoKid" },
    { name: "nick_larsen" },
    { name: "qmacro99" },
    { name: "TimBeaudet" },
    { name: "codephobia" },
    { name: "gep13" },
    { name: "MatthewDGroves" },
    { name: "EdCharbeneau" },
    { name: "CodebaseAlpha" },
    { name: "VexFX" },
    { name: "NinjaBunny9000" },
    { name: "HonestDanGames" },
    { name: "LuckyNoS7evin" },
    { name: "AdronHall" },
    { name: "Clancey" },
    { name: "GarethHubball" },
    { name: "fhinkel" },
    { name: "KymPhillpotts" },
    { name: "tylerleonhardt" },
    { name: "roberttables" },
    { name: "Nodebotanist" },
    { name: "mymultiextruder" },
    { name: "SushiCodes" },
    { name: "IAmNotMyself" },
    { name: "ardalis" },
    { name: "markekraus" },
    { name: "RamblingGeek" },
    { name: "PixelogicDev" },
    { name: "fiercekittenz" },
    { name: "Lannonbr" },
    { name: "Rosuav" },
    { name: "TimVanMonero" },
    { name: "RelevantJesse" }];

let shoutedOut = [];

module.exports =
    {
        shoutOut: (context) => {
            let shoutout = Shoutouties.find(u => u.name.toLowerCase() === context.username.toLowerCase())
            if (shoutout
                && !~shoutedOut.indexOf(context.username)) {
                shoutedOut.push(context.username);
                let message = (shoutout.message || defaultMessage.replace('__NAME__', context['display-name'].replace('_',' ')));
                return message;
            }
        }
    }