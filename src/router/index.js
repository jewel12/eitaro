import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Preps from '@/components/preps/Preps'
import Over from '@/components/preps/Over'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/preps',
      name: 'Preps',
      component: Preps
    },
    {
      path: '/preps/over',
      component: Over
    }
  ]
})
