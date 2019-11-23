import {Action} from '../../lib';
/**
 * Action writing a random number to chat when it is executed
 */
class DiceAction extends Action {

    /**
     * Instantiates a new Dice Action
     */
    constructor(){
        super("Dice Action",'rosie.core.dice.trigger')
    }

    execute(){
        
    }

}