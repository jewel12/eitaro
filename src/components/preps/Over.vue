<template>
  <v-ons-page>
    <v-ons-card class="result">
      <div class="title">
        勝った！勝った！夕飯はドン勝だ！！
      </div>

      <div class="score">
        {{score}} 点
      </div>

      <v-ons-button modifier="large" @click="home">
        <ons-icon icon="md-home"> TOP</ons-icon>
      </v-ons-button>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
  export default {
    name: 'preps-over',
    created: function () {
      if ('score' in this.$route.query) {
        this.score = this.$route.query.score
      }
    },
    data () {
      return {
        score: -1
      }
    },
    methods: {
      home: function () {
        this.$router.push('/')
      }
    }
  }
</script>

<style>
  .result {
    height: 90%;
  }
  .title {
    height: 20%;
    font-weight: bolder;
  }
  .score {
    height: 50%;
    font-size: 30px;
    font-weight: bolder;
    text-align: center;
  }
</style>

