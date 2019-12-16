import Vue from 'vue';
import { Store } from 'vuex';

/**
 * Options for the install of Vue plugins
 * @typedef {object} VuePluginOptions Plugin options
 * @property {Store} store the Vuex store is passed in the options so it can be used in the plugin
 */

/**
 * Base class for plugin, class should not be instantiated only inherited 
 */
export class Plugin {

    /**
     * Constructor instantiates a plugin. Should not be called directly
     * @param {string} name Name of the plugin 
     * @param {string} uuid UUID of the plugin
     * @param {string} type Type of the plugin ('Trigger' or 'Action')
     */
    constructor(name, uuid, type) {
        this.name = name;
        this.uuid = uuid;
        this.type = type;
    }

    /**
    * A Vue.js plugin exposes the install method. This method will be called 
    * with the Vue constructor as the first argument, along with possible options
    * 
    * An example of the method can be found at:
    * https://vuejs.org/v2/guide/plugins.html#Writing-a-Plugin
    * @param {Vue} Vue Vue instance
    * @param {VuePluginOptions} options Options object, contains the Vuex Store
    */
    install(Vue, options) {
        this.$store = options.store;
        this.addComponent(Vue);
        this.onInstall(Vue);
    }

    /**
     * abstract method that is called for every event that should be initialized
     * The class can do whatever it wants in here
     */
    initialize() { }

    /**
     * Abstract method can be implemented by a decentent to add a vue component.
     * @param {Vue} vue The current Vue instance
     */
    addComponent(vue) { }

    /**
     * Abstract method can be implemented by a decentent to add code that needs
     * to be executed when the plugin is added to Vue.
     * @param {Vue} vue The current Vue instance
     */
    onInstall(vue) { }
}