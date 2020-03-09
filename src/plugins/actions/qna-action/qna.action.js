import { Action } from '../../../lib';
import QnaService from './qna.service';

/**
 * TODO: Describe action 
 */
class QnaAction extends Action {

    /**
     * Instantiates a new Qna Action
     */
    constructor() {
        super('QnA Action', 'com.sorskoot.action.qna')
    }

    onInstall() {
        this.$store.watch(
            state => state.config.config['com.sorskoot.action.qna'],
            newValue => {
                if (!this.qnaService) {
                    this.qnaService = new QnaService(newValue.kbName, newValue.kbId, newValue.kbEndpointKey);
                };
            });
    }
    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(message) {
        this.qnaService.call(message).then((response) => {
            if (!!response.answers.length) {
                if (!response.answers[0].answer.startsWith('!') &&
                    response.answers[0].score > 40) {
                    this.$store.dispatch('triggerAction/trigger', {
                        uuid:'rosie.core.trigger.immidiate', 
                        eventName:'rosie.core.action.chat.send',
                        params: [response.answers[0].answer]
                    });
                } else {
                    this.$store.dispatch('triggerAction/trigger', {
                        uuid: 'rosie.core.trigger.chat.command',
                        eventName: response.answers[0].answer,
                        params: []
                    });
                }
            }

        })
    }

}

export default new QnaAction();