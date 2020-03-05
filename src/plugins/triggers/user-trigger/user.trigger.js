import {Trigger} from '../../../lib';

/**
 * 
 */
class UserTrigger extends Trigger {

    /**
     * Instantiates a new UserTrigger plugin
     */
    constructor(){
        super('User Trigger', 'com.rosie.user.trigger');
    }

    initialize(options){
       
    }
}

/**
 * Export an instance of the User trigger
 */
export default new UserTrigger();