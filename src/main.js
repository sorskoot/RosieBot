import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dotenv from 'dotenv';
import chatTrigger from './plugins/chat-trigger/chat-trigger-plugin';

// Hack until figured out how to dotenv in vue
process.dotenv = dotenv.config().parsed;
Vue.config.productionTip = false

Vue.use(chatTrigger, { store });

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
