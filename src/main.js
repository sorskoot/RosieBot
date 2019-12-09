import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dotenv from 'dotenv';
import eventHandler from './lib/eventHandler';

import chatCommandTrigger from './plugins/chat-trigger/chat-command-trigger';

import chatAction from './plugins/chat-action/chat-message-action';
import hueAction from './plugins/hue-action/hue.action';
import midiAction from './plugins/midi-action/midi.action';
import consoleAction from './plugins/console-action';

// Hack until figured out how to dotenv in vue
process.dotenv = dotenv.config().parsed;
Vue.config.productionTip = false

Vue.use(chatCommandTrigger, { store });
Vue.use(chatAction, { store });
Vue.use(consoleAction, { store });
Vue.use(hueAction, { store });
Vue.use(midiAction, { store });

Vue.use(eventHandler, { store, actions:[chatAction,consoleAction,hueAction,midiAction], triggers:[chatCommandTrigger] });

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
