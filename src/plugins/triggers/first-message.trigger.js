import { Trigger } from '../../lib';
import tmp from 'tmp';
import fs from 'fs';

/**
 * 
 */
class FirstMessageTrigger extends Trigger {

    /**
     * Instantiates a new FirstMessageTrigger plugin
     */
    constructor() {
        super('FirstMessage', 'rosie.core.trigger.first-message');
        this.users = [];
        this.seen = [];
    }

    storeGetter(state) {
        return state.twitchChat.message;
    }

    /**
       * Called when the action is installed in Vue
       */
    onInstall() {
        this.$store.watch(
            state => state.config.config['events'],
            events => this.initEvents(events));
        super.onInstall();
    }
    /**
    * 
    * @param {[]} events 
    */
    initEvents(events) {
        this.commands = [];

        this.getUsersFromTemp().then(u => {
            this.seen = u;


            for (let i = 0; i < events.length; i++) {
                if (!!events[i].trigger[this.uuid]) {
                    if (Array.isArray(events[i].trigger[this.uuid])) {
                        for (let j = 0; j < events[i].trigger[this.uuid].length; j++) {
                            const user = events[i].trigger[this.uuid][j];
                            this.users.push(user);
                        }
                    } else {
                        this.users.push(events[i].trigger[this.uuid].toLowerCase());
                    }
                }
            }
        }, e => console.error(e));

    }

    storeChange({ user }) {
        return;
        if (!this.users.includes(user)) {
            return;
        }

        if (this.seen.includes(user)) {
            return;
        }

        this.seen.push(user);
        this.storeUsersInTemp(this.seen);
        this.triggerEvent(user, { user });

    }

    /**
     * Read users from a tempfile and returns.
     * @returns {string[]} users
     */
    async getUsersFromTemp() {
        try {
            const file = await this.readFile();
            //fs.close(tempfile.fd);
            const storedUsers = JSON.parse(file);
            return storedUsers;
        } catch (ex) {
            console.error(ex);
        }
    }

    readFile() {
        const tempfile = this.getTempFilename();
        if (!fs.existsSync(tempfile)) {
            return '[]';
        }
        return new Promise((res, rej) => {
            console.log('reading temp file');
            fs.readFile(tempfile, { encoding: 'utf-8' }, (err, buf) => {
                console.log('read temp file');

                if (err) {
                    console.log(`error reading file:${err.message}`);
                    rej(err.message);
                } else {

                    console.log(`success reading file`);
                    res(buf.toString() || '[]');

                }
            });
        });
    }

    /**
    * Read users from a tempfile and returns.
    * @param {string[]} users
    */
    storeUsersInTemp(users) {
        const tempfile = this.getTempFilename();
        fs.writeFile(tempfile, JSON.stringify(users), () => { });
    }

    getTempFilename() {
        /** @type {string} tempfilename  */
        let tempfilename = this.$store.state.twitch.streamData.startedAt || new Date().toDateString();
        tempfilename = tempfilename.replace(/\s/gi, '_');
        const tempfile = `${tmp.tmpdir}/${tempfilename}.json`;
        return tempfile;
    }
}

/**
 * Export an instance of the  trigger
 */
export default new FirstMessageTrigger();