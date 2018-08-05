<template>
  <v-ons-page>
    <v-ons-card class="result">
      <div class="title">
        勝った！勝った！夕飯はドン勝だ！！
      </div>
      <v-ons-button modifier="large" @click="home">
        <ons-icon icon="md-home"> TOP</ons-icon>
      </v-ons-button>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
  let component = {
    name: 'words-over',
    methods: {
      home: function () {
        this.$router.push('/')
      }
    }
  }

  export default component
  export {component as Over}
</script>

<style>
  .result {
    height: 90%;
  }
  .title {
    height: 20%;
    font-weight: bolder;
  }
</style>

