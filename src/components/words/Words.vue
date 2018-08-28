<template id="words-page">
  <v-ons-page>
    <div class="loading" v-if="loading">
      loading...
    </div>
    <div class="content" v-else>
      <over v-if="over"
            :result="qas.result"
      ></over>
      <question
        v-for="q in qas.all()"
        v-show="q.no === currentNo"
        :qa="q"
        :key="q.no"
        @answered="answered"
        v-else
      ></question>
    </div>
  </v-ons-page>
</template>

<script>
  import Question from './Question'
  import Over from './Over'
  import {loadWords} from '@/qa/words'
  import firebase from 'firebase'

  export default {
    name: 'words',
    components: {Question, Over},
    created: function () {
      this.fetch()
    },
    data () {
      return {
        loading: true,
        over: false,
        currentNo: 0
      }
    },
    methods: {
      fetch: function () {
        const user = firebase.auth().currentUser.uid
        loadWords(user).then(qas => {
          this.qas = qas
          this.currentNo = this.qas.current.no
          this.loading = false
        })
      },
      answered: function (isCorrect) {
        this.qas.answer(isCorrect)
        if (this.qas.hasNext()) {
          this.currentNo = this.qas.current.no
        } else {
          this.qas.done()
          this.over = true
        }
      }
    }
  }
</script>

<style>
  .content {
    height: 100%
  }
</style>
