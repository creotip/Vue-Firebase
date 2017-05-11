import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Quiz from '../components/Quiz.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
