// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import VueParticles from 'vue-particles'

Vue.use(VueFire)
Vue.use(VueParticles)
Vue.config.productionTip = false

// import './assets/calc.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
