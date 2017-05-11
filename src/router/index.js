import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'
import Quiz from '../components/Quiz.vue'
import auth from '../firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/classes',
    name: 'Hello',
    component: Hello
  },
  {path: '/', redirect: 'classes'},
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  auth.authUser().then(() => {
    next()
  })
})

export default router
