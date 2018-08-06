<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    mounted () {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          var provider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithRedirect(provider).then(result => {
            window.opener.postMessage(
              {'token': result.credential.idToken}
              , window.location.protocol + '//' + window.location.host)
          })
        }
      })
    }
  }
</script>
