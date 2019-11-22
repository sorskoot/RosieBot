import diceCommand from './DiceCommand';

class Plugin {

}

class Trigger extends Plugin {

    constructor() {
        super();
    }

    install(Vue, options) {
        Vue.component('core-dice-command', diceCommand)
        console.log("plugin Dicecommand loaded.", options.store)
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

    storeChange(newValue, oldValue) { }

    storeGetter(state) { }
}


class DiceCommand extends Trigger {

    storeGetter(state) {
        return state.twitchChat.message;
    }

    storeChange(newValue, oldValue) {
        console.log(`Updating from ${oldValue.message} to ${newValue.message}`);
    }

}

export default new DiceCommand();