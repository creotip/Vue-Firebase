// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import VueParticles from 'vue-particles'
import { firebaseConfig } from './firebaze/config'
import database from './firebaze/database'

Vue.use(VueFire)
Vue.use(VueParticles)
Vue.config.productionTip = false

const initApp = () => {
  firebase.initializeApp(firebaseConfig)
  database.init()
}

initApp()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
