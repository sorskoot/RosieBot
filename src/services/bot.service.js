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

    }

    sendStatus(event) {
        this.directLine.postActivity({
            from: { id: 'Rosie-Client' },
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
            from: { id: 'Rosie-Client' },             
            type: type,
            text: text,
            locale: "en-EN"
        }).subscribe(
            id => {
               
            },
            error => console.log("Error posting activity", error)
        );
    }

    send(message) {
        this.directLine.postActivity({
            from: { id: 'Rosie-Client' }, 
            type: 'message',
            text: message,
            locale: "en-EN"
        }).subscribe(
            id => {
            },
            error => console.log("Error posting activity", error)
        );
    }

    onEvent(activity) {

        if (activity.from.id === "Rosie-Client") {
            this.emit("message-from-self-received", activity.text);
            return;
        }

        switch (activity.type) {
            case "message":
                if (isJSON(activity.text)) {
                    /** @type {BotEvent} */
                    const botEvent = JSON.parse(activity.text);
                    this.emit("event-received", botEvent);
                } else {
                    this.emit("message-received", activity.text);
                }
                break;
            case "event":                          
            case "typing":            
            default:
                console.log(activity);
                break;
        }
    }

}