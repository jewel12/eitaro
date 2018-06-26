<template id="preps-page">
  <v-ons-page>
    <div class="loading" v-if="loading">
      loading...
    </div>
    <div class="content" v-else>
      <question
        v-for="q in qas.all()"
        v-show="q.no === currentNo"
        :qa="q"
        :key="q.no"
        @answered="answered"
      ></question>
    </div>
  </v-ons-page>
</template>

<script>
  import Question from './Question'
  import {loadQuestions} from '../../qa.js'

  export default {
    components: {Question},
    name: 'preps',
    created: function () {
      this.fetch()
    },
    data () {
      return {
        loading: true,
        currentNo: 0
      }
    },
    methods: {
      fetch: function () {
        loadQuestions().then(qas => {
          this.qas = qas
          this.currentNo = this.qas.current.no
          this.loading = false
        })
        this.gameover = false
        this.score = 0
      },
      answered: function (hasCorrected) {
        if (hasCorrected) {
          this.score += 1
        }
        if (this.qas.hasNext()) {
          this.qas.next()
          this.currentNo = this.qas.current.no
        } else {
          this.$router.push({
            path: '/preps/over',
            query: {
              score: this.score
            }
          })
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
