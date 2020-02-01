import Vue from 'vue'
import store from '../../store/store';

const requireTrigger = require.context(
  '.',
  true,
  /[\w-]+\.trigger\.js$/
)
let triggers = [];

// For each matching file name...
requireTrigger.keys().forEach((fileName) => {
  const trigger = requireTrigger(fileName)
  triggers.push(trigger.default || trigger);
  
  Vue.use(trigger.default || trigger, { store });
})

export default triggers;