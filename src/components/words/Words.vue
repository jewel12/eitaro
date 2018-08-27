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
        loadWords().then(qas => {
          this.qas = qas
          this.currentNo = this.qas.current.no
          this.loading = false
        })
      },
      answered: function (isCrrect) {
        this.qas.answer(isCrrect)
        if (this.qas.hasNext()) {
          this.currentNo = this.qas.current.no
        } else {
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
