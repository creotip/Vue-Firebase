import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Quiz from '../components/Quiz.vue'
import Profile from '../components/Profile.vue'
import Calculator from '../components/Calculator.vue'
import quizApp from '../components/quizApp.vue'
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
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: Calculator,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/quiz-app',
      name: 'quizApp',
      component: quizApp,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
