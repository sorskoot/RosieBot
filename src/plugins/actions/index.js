import Vue from 'vue'
import store from '../../store/store';

const requireAction = require.context(
  '.',
  true,
  /[\w-]+\.action\.js$/
)
let actions = [];

// For each matching file name...
requireAction.keys().forEach((fileName) => {
  const action = requireAction(fileName)
  actions.push(action.default || action);
  
  Vue.use(action.default || action, { store });
})

export default actions;