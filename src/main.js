import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import dotenv from 'dotenv';
import eventHandler from './lib/eventHandler';

import chatCommandTrigger from './plugins/chat-trigger/chat-command-trigger';
import timedTrigger from './plugins/timed-trigger/timed.trigger';

import chatAction from './plugins/chat-action/chat-message-action';
import hueAction from './plugins/hue-action/hue.action';
import midiAction from './plugins/midi-action/midi.action';
import consoleAction from './plugins/console-action';
import randomAction from './plugins/random-action/random.action';

// Hack until figured out how to dotenv in vue
process.dotenv = dotenv.config().parsed;
Vue.config.productionTip = false

Vue.use(chatCommandTrigger, { store });
Vue.use(timedTrigger, { store });

Vue.use(chatAction, { store });
Vue.use(consoleAction, { store });
Vue.use(hueAction, { store });
Vue.use(midiAction, { store });
Vue.use(randomAction, { store });

Vue.use(eventHandler, { store, 
    actions:[chatAction,consoleAction,hueAction,midiAction,randomAction], 
    triggers:[chatCommandTrigger, timedTrigger] });

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
