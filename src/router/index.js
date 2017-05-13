import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import Quiz from '../components/Quiz.vue'
import auth from '../firebaze/auth'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    component: Home
  },
  {
    path: '/',
    redirect: 'login'
  }
  // {
  //   path: '/quiz',
  //   name: 'Quiz',
  //   component: Quiz,
  //   meta: {
  //     requiresAuth: true
  //   }
  // }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  auth.authUser().then(() => {
    next()
  })
})

export default router
