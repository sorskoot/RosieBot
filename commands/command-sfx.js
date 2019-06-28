const JZZ = require('jzz');

module.exports = {
    sfxBadumts: () => triggerMidiNote(SFX.badumts),
    sfxBingit: () => triggerMidiNote(SFX.bingit),
    sfxFup: () => triggerMidiNote(SFX.fup),
    sfxDoh: () => triggerMidiNote(SFX.doh),
    sfxAllright: () => triggerMidiNote(SFX.allright),
    sfxDuhDuhDuuuh: () => triggerMidiNote(SFX.duhDuhDuuuh),
    sfxBye: () => triggerMidiNote(SFX.bye),
    sfxJustDoIt: () => triggerMidiNote(SFX.justDoIt),
    sfxDunDun: () => triggerMidiNote(SFX.dunDun),
    sfxHeadshot: () => triggerMidiNote(SFX.headshot),
    sfxDrumroll: () => triggerMidiNote(SFX.drumroll),
    sfxInception: () => triggerMidiNote(SFX.inception),
    sfxMCLevelUp: () => triggerMidiNote(SFX.mCLevelUp),
    sfxMCVillager: () => triggerMidiNote(SFX.mCVillager),
    sfxMario1up: () => triggerMidiNote(SFX.mario1up),
    sfxFinishHim: () => triggerMidiNote(SFX.finishHim),
    sfxDoItlive: () => triggerMidiNote(SFX.doItlive),
    sfxApplause: () => triggerMidiNote(SFX.applause),
    sfxAirhorn: () => triggerMidiNote(SFX.airhorn),
    sfxLaugh: () => triggerMidiNote(SFX.laugh),
    sfxDingDong: () => triggerMidiNote(SFX.dingDong),
    sfxSonic: () => triggerMidiNote(SFX.sonic),
    sfxInconceivable: () => triggerMidiNote(SFX.inconceivable),
    sfxMighty: () => triggerMidiNote(SFX.mighty),
    sfxKidding: () => triggerMidiNote(SFX.kidding),
    sfx7Days: () => triggerMidiNote(SFX.thering7days),
    sfxDing: () => triggerMidiNote(SFX.ding),
    sfxPushIt: () => triggerMidiNote(SFX.pushit),
    sfxHowl: () => triggerMidiNote(SFX.howl),
    triggerMidi:triggerMidi
}

const SFX = {
    badumts: 57,
    bingit: 58,
    fup: 59,
    doh: 60,
    allright: 61,
    duhDuhDuuuh: 62,
    bye: 63,
    justDoIt: 64,
    dunDun: 65,
    headshot: 66,
    drumroll: 67,
    inception: 68,
    mCLevelUp: 69,
    mCVillager: 70,
    mario1up: 71,
    finishHim: 72,
    doItlive: 73,
    applause: 74,
    airhorn: 75,
    laugh: 76,
    dingDong: 77,
    sonic: 78,
    inconceivable: 79,
    mighty: 80,
    kidding: 81,
    thering7days: 82,
    ding: 83,
    pushit: 84,
    howl: 85,
}

function triggerMidiNote(note) {
    triggerMidi(0x90, note, 127);
}

function triggerMidi(...message) {
    JZZ().or('Cannot start MIDI engine!')
        .openMidiOut(1).or('Cannot open MIDI Out port!')
        .send(message);
}

