<template id="words-page">
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
  import {loadWords} from '../../qa/words'

  export default {
    name: 'words',
    components: {Question},
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
        loadWords().then(qas => {
          this.qas = qas
          this.currentNo = this.qas.current.no
          this.loading = false
        })
      },
      answered: function (isCollected) {
        if (this.qas.hasNext()) {
          this.qas.next()
          this.currentNo = this.qas.current.no
        } else {
          this.$router.push({path: '/words/over'})
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
