import EventEmitter from 'events';
import { DirectLine } from 'botframework-directlinejs';
import { isJSON } from '../lib/utils';

/**
 * @typedef BotEvent
 * @property {string} event The event that has happened
 * @property {string} value The value gived to work with the event
 */

export class BotService extends EventEmitter {

    constructor(config) {
        super();
        this.config = config;

        this.directLine = new DirectLine({
            secret: this.config.directLine
        });
        this.directLine.activity$.subscribe(this.onEvent.bind(this));

        //this.sendStatus('initialize')
    }

    sendStatus(event) {
        this.directLine.postActivity({
            from: { id: 'Rosie-Client', name: 'Sorskoot' }, // required (from.name is optional)
            type: 'event',
            text: event,
            locale: "en-EN"
        }).subscribe(
            id => console.log("Posted activity, assigned ID ", id),
            error => console.log("Error posting activity", error)
        );
    }

    sendActivity(type, text) {
        this.directLine.postActivity({
            from: { id: 'Rosie-Client', name: 'Sorskoot' }, // required (from.name is optional)     
            type: type,
            text: text,
            locale: "en-EN"
        }).subscribe(
            id => {
                //   console.log("Posted activity, assigned ID ", id)
            },
            error => console.log("Error posting activity", error)
        );
    }

    send(message) {
        this.directLine.postActivity({
            from: { id: 'Rosie-Client', name: 'Sorskoot' }, // required (from.name is optional)     
            type: 'message',
            text: message,
            locale: "en-EN"
        }).subscribe(
            id => {
                //   console.log("Posted activity, assigned ID ", id)
            },
            error => console.log("Error posting activity", error)
        );
    }

    onEvent(activity) {

        if (activity.from.id === "Rosie-Client") {
            //console.log(`from self: ${activity.text}`);
            this.emit("message-from-self-received", activity.text);
            return;
        }

        switch (activity.type) {
            case "message":
                if (isJSON(activity.text)) {
                    /** @type {BotEvent} */
                    //console.log(`activity from bot: ${activity.text}`);
                    const botEvent = JSON.parse(activity.text);
                    // console.log("received event ", botEvent);
                    this.emit("event-received", botEvent);
                } else {
                    //console.log(`from bot: ${activity.text}`);
                    //   console.log("received message ", activity.text);
                    this.emit("message-received", activity.text);
                }
                break;
            //case "event":              
            //  break;
            //case "typing":
            //break;
            default:
                console.log(activity);
                break;
        }
    }

}