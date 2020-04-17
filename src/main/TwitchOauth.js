import { BrowserWindow } from 'electron'
import Store from 'electron-store';

export const twitchOauth = {
    handle: function () {
        return new Promise((res, rej) => {
            let store = new Store();
            let authWindow = new BrowserWindow({
                width: 800,
                height: 600,
                show: false,
                'node-integration': false,
                'web-security': false
            });

            function handleCallback (url) {
                var raw_code = /#access_token=([^&]*)/.exec(url) || null;
                var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
                var error = /\?error=(.+)$/.exec(url);
                
                if (code || error) {
                  // Close the browser if code found or error
                  authWindow.destroy();
                }
                if (code) {
                    store.set('oauth-token', code);
                    res(code);
                } else if (error) {
                    rej('Oops! Something went wrong and we couldn\'t' +
                    'log you in using Github. Please try again.');
                }
              }
            
            // This is just an example url - follow the guide for whatever service you are using
            var authUrl = 'https://id.twitch.tv/oauth2/authorize?client_id=775d471xdokmb2jo5zvz5opyopo5k1&response_type=token&scope=bits:read+channel:read:redemptions+channel_subscriptions+channel:moderate+whispers:read+user:edit:broadcast&redirect_uri=http://localhost'

            // 'will-navigate' is an event emitted when the window.location changes
            // newUrl should contain the tokens you need
            // authWindow.webContents.on('will-navigate', function (event, newUrl) {
            //     console.log('will-navigate');
            //     handleCallback(newUrl);
            // });
            authWindow.webContents.on('will-redirect', function (event, newUrl) {
                handleCallback(newUrl);
            });
            // authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
            //     console.log('did-get-redirect-request');
            //     handleCallback(newUrl);
            //   });

            authWindow.on('closed', function () {
                authWindow = null;
            });

            authWindow.loadURL(authUrl);
            authWindow.show();
        });

    }
}


