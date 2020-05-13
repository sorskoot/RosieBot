import { Action } from '../../lib';
import streamLabs from '../../services/streamlabs.service';

/**
 * TODO: Describe action 
 */
class UpdateLabelsAction extends Action {

    /**
     * Instantiates a new UpdateLabels Action
     */
    constructor() {
        super('update labels', 'core.rosie.action.update-labels')
    }
    
    async execute(labelToUpdate) {
        let labels = await streamLabs.getLabels(this.$store.state.config.config['streamlabs'].api_token);
        for (let i = 0; i < labelToUpdate.length; i++) {
            const element = labelToUpdate[i];
            this.$store.dispatch('obs/changetext',{target:`text-rosie:${element}`,text:labels[element]})    
        }
        
    }

}

export default new UpdateLabelsAction();