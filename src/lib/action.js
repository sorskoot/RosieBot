import { Plugin } from './plugin';

/**
 * Base class for Action Plugins. An action performs something, it makes something happen.
 * Actions are called when a trigger happens.
 * This class should not be instantiated, only inherited
 */
export class Action extends Plugin {

    /**
     * Instantiates an Action.
     * @param {string} name The name of the Action
     * @param {string} uuid The unique ID of the Action
     */
    constructor(name, uuid) {
        super(name, uuid, 'Action');
    }
    /**
     * The execute method of an Action gets called when a trigger fires.
     * This is just an abstract placeholder.
     */
    execute() {}
}