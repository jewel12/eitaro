<template>
  <div>
    <div id="firebaseui-auth-container"></div>
    <div>
      <textarea class="textarea" rows="3" placeholder="token" v-model="token"></textarea>
    </div>

    <v-ons-button modifier="cta" @click="signin">Sign In</v-ons-button>
    <v-ons-button modifier="cta" @click="auth">Go Auth</v-ons-button>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data () {
      return {
        token: ''
      }
    },
    created () {
      firebase.auth().getRedirectResult().then(result => {
        this.token = JSON.stringify({
          'idToken': result.credential.idToken,
          'accessToken': result.credential.accessToken
        })
      })
    },
    methods: {
      signin: function () {
        const t = JSON.parse(this.token)
        const cred = firebase.auth.GoogleAuthProvider.credential(
          t.idToken,
          t.accessToken
        )
        firebase.auth().signInAndRetrieveDataWithCredential(cred).then(_ => {
          this.$router.push('/')
        })
      },
      auth: function () {
        firebase.auth().onAuthStateChanged(user => {
          if (!user) {
            var provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithRedirect(provider)
          }
        })
      }
    }
  }
</script>
