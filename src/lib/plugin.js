/**
 * Base class for plugin
 */
export class Plugin {
    
    /**
     * Constructor instantiates a plugin. Should not be called directly
     * @param {string} name Name of the plugin 
     * @param {string} uuid UUID of the plugin
     * @param {string} type Type of the plugin ('Trigger' or 'Action')
     */
    constructor(name, uuid, type){
        this.name = name;
        this.uuid = uuid;
        this.type = type;
    }
}