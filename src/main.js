import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import dotenv from 'dotenv';
import eventHandler from './lib/eventHandler';

import './services/ipc.service';

import triggers from './plugins/triggers';
import actions from './plugins/actions';

// Hack until figured out how to dotenv in vue
process.dotenv = dotenv.config().parsed;
Vue.config.productionTip = false

Vue.use(eventHandler, {
    store,
    actions,
    triggers 
});

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
