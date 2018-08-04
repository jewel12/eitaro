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
  export default {
    name: 'words',
    created: function () {
    },
    data () {
      return {
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
