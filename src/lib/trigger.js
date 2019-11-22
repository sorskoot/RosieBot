import { Plugin } from './plugin';
import { Store } from 'vuex';

/**
 * Options for the install of Vue plugins
 * @typedef {object} VuePluginOptions Plugin options
 * @property {Store} store the Vuex store is passed in the options so it can be used in the plugin
 */

/**
 * Base class for Trigger Plugins. A trigger listens for something to happen.
 * Triggers are used to determain what Actions should be called.
 */
export class Trigger extends Plugin {
    /**
    * constructs a new trigger plugin. Should not be called directly
    * @param {string} name of the trigger plugin 
    * @param {string} uuid of the trigger plugin
    */
    constructor(name, uuid) {
        super(name, uuid, 'Trigger');
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
        
        this.addComponent(Vue);

        options.store.watch(
            (state, getters) => {
                return this.storeGetter(state)
            },
            (newValue, oldValue) => {
                this.storeChange(newValue, oldValue);
            });

        // 1. add global method or property
        Vue.myGlobalMethod = function () {
            // some logic ...
        }

        // 2. add a global asset
        Vue.directive('my-directive', {
            bind(el, binding, vnode, oldVnode) {

            }
        })

        // 3. inject some component options
        Vue.mixin({
            created: function () {
                // some logic ...
            }
        })

        // 4. add an instance method
        Vue.prototype.$myMethod = function (methodOptions) {
            // some logic ...
        }
    }

    addComponent(vue) { }

    triggerEvent(eventName, ...params){
        // raise a trigger event.
        console.log('trigger',this.uuid, eventName, params)
    }

    /**
     * The storeChange function is called when the value
     * selected in the storeGetter method changes.
     * 
     * Function needs to be overrided and
     * @param {*} newValue The new value of the state
     * @param {*} oldValue The old value of the state
     */
    storeChange(newValue, oldValue) { }

    /**
     * The storeGetter function should return an object from the state that 
     * the trigger should listen to.
     * 
     * Function needs to be overrided.
     * @param {*} state the Vuex Root State object
     */
    storeGetter(state) { }
}