const JZZ = require('jzz');

module.exports = {
    sfxBadumts: () => triggerMidi(SFX.badumts),
    sfxBingit: () => triggerMidi(SFX.bingit),
    sfxFup: () => triggerMidi(SFX.fup),
    sfxDoh: () => triggerMidi(SFX.doh),
    sfxAllright: () => triggerMidi(SFX.allright),
    sfxDuhDuhDuuuh: () => triggerMidi(SFX.duhDuhDuuuh),
    sfxBye: () => triggerMidi(SFX.bye),
    sfxJustDoIt: () => triggerMidi(SFX.justDoIt),
    sfxDunDun: () => triggerMidi(SFX.dunDun),
    sfxHeadshot: () => triggerMidi(SFX.headshot),
    sfxDrumroll: () => triggerMidi(SFX.drumroll),
    sfxInception: () => triggerMidi(SFX.inception),
    sfxMCLevelUp: () => triggerMidi(SFX.mCLevelUp),
    sfxMCVillager: () => triggerMidi(SFX.mCVillager),
    sfxMario1up: () => triggerMidi(SFX.mario1up),
    sfxFinishHim: () => triggerMidi(SFX.finishHim),
    sfxDoItlive: () => triggerMidi(SFX.doItlive),
    sfxApplause: () => triggerMidi(SFX.applause),
    sfxAirhorn: () => triggerMidi(SFX.airhorn),
    sfxLaugh: () => triggerMidi(SFX.laugh),
    sfxDingDong: () => triggerMidi(SFX.dingDong),
    sfxSonic: () => triggerMidi(SFX.sonic),
    sfxInconceivable: () => triggerMidi(SFX.inconceivable),
    sfxMighty: () => triggerMidi(SFX.mighty),
    sfxKidding: () => triggerMidi(SFX.kidding),
    sfx7Days: () => triggerMidi(SFX.thering7days),
    sfxDing: () => triggerMidi(SFX.ding),
    sfxPushIt: () => triggerMidi(SFX.pushit),
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
}

function triggerMidi(note) {
    JZZ().or('Cannot start MIDI engine!')
        .openMidiOut(1).or('Cannot open MIDI Out port!')
        .send([0x90, note, 127]);
}