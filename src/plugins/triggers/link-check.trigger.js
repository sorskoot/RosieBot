import { Trigger } from '../../lib';
import cheerio from 'cheerio';
import { ipcRenderer } from 'electron';

/**
 * 
 */
class LinkCheckTrigger extends Trigger {

    /**
     * Instantiates a new LinkCheckTrigger plugin
     */
    constructor() {
        super('Link Check Trigger', 'rosie.core.trigger.linkcheck');
        this.regex = /(((http|https):\/\/)?((\w+\.)+\w+))/gim;
    }

    /**
    * Called by the base class to specify the getter of the store to watch
    * @param {*} state 
    */
    storeGetter(state) {
        return state.twitchChat.message;
    }

    /**
     * Called when a twitch event is received and raises
     * @param {twitchEvent} value 
     */
    storeChange(value) {
        if (this.containsLink(value.message)) {
            //console.log(value.user, value.message);
            this.regex.lastIndex = 0;
            var m = null;
            let getTitles = [];
            do {
                m = this.regex.exec(value.message)
                if (m) {
                    getTitles.push(this.getTitle(m[0]));
                }
            } while (m);

            Promise.all(getTitles).then(titles => {
                titles = titles.filter(x => !!x);
                if (titles.length > 0) {
                    this.triggerEvent('*',`Thank you @${value.user}! You just shared ${titles.length > 1 ? 'links' : 'a link'} to '${titles.join('\' and \'')}' with us.`);
                }
            }, e => console.log(e))
        }
    }

    containsLink(message) {
        this.regex.lastIndex = 0;
        return this.regex.test(message);
    }

    getTitle(url) {
        if (!url.startsWith("http")) {
            url = 'https://' + url;
        }
        return new Promise(async (res, rej) => {
            ipcRenderer.on('proxy-response', (event, body) => {
                try{
                     const $ = cheerio.load(body);
                    res($("head>title").text());
                }catch(e){
                    console.log(e);
                    res(undefined); // resolve anyway.
                }
            })
            ipcRenderer.send('proxy-request', url);
        });
    }
}

/**
 * Export an instance of the LinkCheck trigger
 */
export default new LinkCheckTrigger();