import { BrowserWindow } from 'electron'
import Store from 'electron-store';

export const spotifyOauth = {
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
                var raw_code = /code=([^&]*)/.exec(url) || null;
                var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
                var error = /\?error=(.+)$/.exec(url);
                
                if (code || error) {
                  // Close the browser if code found or error
                  authWindow.destroy();
                }
                if (code) {
                    store.set('spotify-oauth-token', code);
                    store.delete('spotify-refresh-token');
                    res(code);
                } else if (error) {
                    rej('Oops! Something went wrong and we couldn\'t' +
                    'log you in using Github. Please try again.');
                }
              }
            // This is just an example url - follow the guide for whatever service you are using
            var authUrl = 'https://accounts.spotify.com/authorize?client_id=ef073e9f8ba74069abd90b2fb1e8f6d7&response_type=code&scope=user-modify-playback-state&redirect_uri=http://localhost&show_dialog=false'

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


