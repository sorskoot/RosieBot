import { Action } from '../../lib';

/**
 * TODO: Describe action 
 */
class GlobalSettingAction extends Action {

    /**
     * Instantiates a new GlobalSetting Action
     */
    constructor() {
        super('Change Global Setting', 'core.rosie.action.global-setting')
    }
        
    execute({key,value}) {
        this.$store.dispatch("global/set",{key,value});
    }

}

export default new GlobalSettingAction();