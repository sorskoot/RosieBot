import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import dotenv from 'dotenv';
import eventHandler from './lib/eventHandler';

import { ipcService } from './services/ipc.service';
import page from './plugins/pages/helloworld';

import chatCommandTrigger from './plugins/triggers/chat-trigger/chat-command-trigger';
import timedTrigger from './plugins/triggers/timed-trigger/timed.trigger';
import eventTrigger from './plugins/triggers/event-trigger/event.trigger';
import emoteTrigger from './plugins/triggers/emote-trigger/emote.trigger';

import chatAction from './plugins/actions/chat-action/chat-message-action';
import hueAction from './plugins/actions/hue-action/hue.action';
import midiAction from './plugins/actions/midi-action/midi.action';
import consoleAction from './plugins/actions/console-action';
import randomAction from './plugins/actions/random-action/random.action';
import emoteAction from './plugins/actions/emote-action/emote.action';

// Hack until figured out how to dotenv in vue
process.dotenv = dotenv.config().parsed;
Vue.config.productionTip = false

Vue.use(chatCommandTrigger, { store });
Vue.use(timedTrigger, { store });
Vue.use(eventTrigger, { store });
Vue.use(emoteTrigger, { store });

Vue.use(chatAction, { store });
Vue.use(consoleAction, { store });
Vue.use(hueAction, { store });
Vue.use(midiAction, { store });
Vue.use(randomAction, { store });
Vue.use(emoteAction, { store });

Vue.use(eventHandler, {
    store,
    actions: [chatAction, consoleAction, hueAction, midiAction, randomAction, emoteAction],
    triggers: [chatCommandTrigger, timedTrigger, eventTrigger, emoteTrigger]
});

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
