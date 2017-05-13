import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'
import Hello from '@/components/Hello'
import Quiz from '../components/Quiz.vue'
import Login from '../components/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (Firebase.auth().currentUser) {
    // have user info
    next({
      path: '/'
    })
    return
  }

  Firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(`Have user info: ${user}`)
    } else {
      console.log('Dont have user info')
    }
  })
})

export default router
