<template id="words-page">
  <v-ons-page>
    <div class="loading" v-if="loading">
      loading...
    </div>
    <div class="content" v-else>

    </div>
  </v-ons-page>
</template>

<script>
  import {loadWords} from '../../qa/words'

  export default {
    name: 'words',
    created: function () {
      this.words = loadWords()
      this.loading = false
    },
    data () {
      return {
        loading: true
      }
    },
    methods: {
    }
  }
</script>

<style>
  .content {
    height: 100%
  }
</style>
