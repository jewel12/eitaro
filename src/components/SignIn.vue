<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
  import firebase from 'firebase'
  import firebaseui from 'firebaseui'
  import 'firebaseui/dist/firebaseui.css'

  export default {
    mounted () {
      var ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        signInFlow: 'popup'
      })
    }
  }
</script>
