module.exports = {
    lerp, delay
}

function lerp(from, to, steps, time, callback) {
    let x = delay(0);
    let stepsize = (to - from) / steps;
    if (stepsize > 0) {
        for (let i = from; i < to; i += stepsize) {
            x = x.then(() => delay(time / steps))
                .then(() => callback(i))
        }
    } else {
        for (let i = from; i > to; i += stepsize) {
            x = x.then(() => delay(time / steps))
                .then(() => callback(i))
        }
    }
    x = x.then(() => callback(to));
}

function delay(time) {
    return new Promise(res => {
        setTimeout(res, time);
    })
}