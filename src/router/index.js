import firebase from 'firebase'

import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import Preps from '@/components/preps/Preps'
import {Over as PrepsOver} from '@/components/preps/Over'
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
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/preps',
      name: 'Preps',
      component: Preps
    },
    {
      path: '/preps/over',
      component: PrepsOver
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!requiresAuth) {
    next()
    return
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      next()
    } else {
      next('/signin')
    }
  })
})

export default router
