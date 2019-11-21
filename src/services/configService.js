const config = require('electron-json-config');

function loadConfig(){
    return new Promise((res,rej)=>{
        res(config.all());
    })
}

export const configService = {
    getConfig: loadConfig
}