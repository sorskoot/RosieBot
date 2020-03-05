const config = require('electron-json-config');

const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' },
            {
                role: 'config',
                label: 'Authorize …',
                click: async () => {
                    const { twitchOauth } = require('./main/TwitchOauth')
                    try {
                        let code = await twitchOauth.handle();
                    } catch (e) {
                        console.log(e);
                    }
                }
            },

        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startspeaking' },
                        { role: 'stopspeaking' }
                    ]
                }
            ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' },
                ]),
            { type: 'separator' },
            {
                role: 'config',
                label: 'Edit Config...',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal(config.file());
                }
            },
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                    { role: 'close' }
                ])
        ]
    },
    {
        label: 'Twich',
        submenu: [
            {
                label: 'Watch the stream',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://twitch.tv/sorskoot')
                }
            }
        ]
    },
    ,

]

function build() {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

export const menu = {
    build
}

