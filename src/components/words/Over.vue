<template>
  <v-ons-page>
    <v-ons-card class="over">
      <v-ons-list>
        <v-ons-list-header>結果</v-ons-list-header>

        <v-ons-list-item v-for="r in result.all()" :key="r.qa.no">
          <div class="correct-check">
            <ons-icon icon="check" v-if="r.isCorrected"></ons-icon>
          </div>
          {{r.qa.en}}
        </v-ons-list-item>
      </v-ons-list>
      <v-ons-button modifier="large" @click="home">
        <ons-icon icon="md-home"> TOP</ons-icon>
      </v-ons-button>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
  import {Result} from '@/qa/words'

  export default {
    props: {
      result: {
        type: Result
      }
    },
    name: 'words-over',
    methods: {
      home: function () {
        this.$router.push('/')
      }
    }
  }
</script>

<style>
  .correct-check {
    color: lawngreen;
    width: 30px
  }
</style>
