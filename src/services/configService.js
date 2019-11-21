const config = require('electron-json-config');

/**
 * Loads all the configuration from disk (local appdata)
 */
function loadConfig() {
    return new Promise((res, rej) => {
        try {
            res(config.all());
        } catch (err) {
            rej(err);
        }
    })
}

export const configService = {
    loadConfig
}