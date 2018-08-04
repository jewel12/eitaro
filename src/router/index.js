import firebase from 'firebase'

import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Preps from '@/components/preps/Preps'
import Over from '@/components/preps/Over'
import Words from '@/components/words/Words'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/preps',
      name: 'Preps',
      component: Preps
    },
    {
      path: '/preps/over',
      component: Over
    },
    {
      path: '/words',
      name: 'Words',
      component: Words,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!requiresAuth || firebase.auth().currentUser) {
    next()
  } else {
    next('/login')
  }
})

export default router
