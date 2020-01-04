import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
    console.log("beforeEach");
    /* must call `next` */
    next();
  })
  
  router.beforeResolve((to, from, next) => {
    console.log("beforeResolve");
    /* must call `next` */
    next();
  })
  
  router.afterEach((to, from) => {
    console.log("afterEach");
  })
export default router
