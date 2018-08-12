import firebase from 'firebase'

import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import Preps from '@/components/preps/Preps'
import {Over as PrepsOver} from '@/components/preps/Over'
import {Over as WordsOver} from '@/components/words/Over'
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
    },
    {
      path: '/words/over',
      component: WordsOver,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    if (firebase.auth().currentUser) {
      next()
    } else {
      let popup = window.open('#/signin')
      window.open('#/signin')
      window.addEventListener('message', function (e) {
        if (event.origin !== window.location.protocol + '//' + window.location.host) return
        if (typeof e.data === 'object' && 'token' in e.data) {
          popup.close()
          let cred = firebase.auth.GoogleAuthProvider.credential(e.data.token)
          firebase.auth().signInWithCredential(cred).then(_ => {
            next()
          })
        }
      })
    }
  } else {
    next()
  }
})

export default router
