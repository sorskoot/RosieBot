import {Trigger} from '../../../lib';

/**
 * Trigger that handles API requests coming in
 */
class APITrigger extends Trigger {

    /**
     * Instantiates a new API Trigger plugin
     */
    constructor(){
        super('API trigger', 'core.rosie.trigger.api');
    }

    /**
     * Called by the base class to specify the getter of the store to watch
     * @param {*} state 
     */
    storeGetter(state) {
        return state.api.request;
    }

    /**
     * When a request comes in through the store the event triggers
     * @param {*} request The request that came from the api
     */
    storeChange(request) {
       this.triggerEvent(request.api, request.data)
       this.$store.dispatch("api/return",{id:request.id,data:"OK"});
    }
}

/**
 * Export an instance of the API
 * trigger
 */
export default new APITrigger();