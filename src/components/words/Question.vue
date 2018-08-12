<template>
  <v-ons-card class="question">
    <v-ons-row vertical-align="top" class="status">
      {{status}}
    </v-ons-row>
    <v-ons-row vertical-align="center" class="desc">
      <ons-col>
        <div v-if="!hasAnswered">
          <p class="word">{{desc}}</p>
        </div>
        <div v-else>
          <div class="answered">
            <p class="answered-pron">{{pronunciation}}</p>
            <p v-bind:class="[ hasCorrected ? 'corrected' : 'incorrected', 'answered-en']">{{en}}</p>
            <p class="answered-ja">{{desc}}</p>
          </div>
        </div>
      </ons-col>
    </v-ons-row>
    <div v-if="!hasAnswered">
      <v-ons-row vertical-align="bottom" class="input">
        <ons-col class="answer" width="90%">
          <v-ons-input ref="input" type="url" placeholder="Answer" v-model="input" modifier="underbar">
          </v-ons-input>
        </ons-col>
        <ons-col width="10%">
          <v-ons-button @click="answer()">
            Go
          </v-ons-button>
        </ons-col>
      </v-ons-row>
    </div>
    <div class="next" v-else>
      <v-ons-button class="next-button" @click="next()">
        次へ
      </v-ons-button>
    </div>
  </v-ons-card>
</template>

<script>
  import {QA} from '@/qa/words.js'

  export default {
    name: 'word-question',
    props: {
      qa: {
        type: QA
      }
    },
    data () {
      return {
        status: this.qa.no + ' 問目',
        desc: this.qa.ja,
        hasAnswered: false,
        hasCorrected: false,
        input: '',
        en: '',
        pronunciation: ''
      }
    },
    methods: {
      answer: function () {
        if (this.qa.isCorrect(this.input)) {
          this.hasCorrected = true
        }
        this.en = this.qa.en
        this.pronunciation = this.qa.pronunciation
        this.hasAnswered = true
      },
      next: function () {
        this.$emit('answered', this.hasCorrected)
      }
    }
  }
</script>

<style>
  .question {
    height: 98%;
  }
  .status {
    height: 5%;
  }
  .desc {
    height: 85%;
  }
  .word {
    font-weight: bold;
    text-align: center;
    font-size: 80px;
  }
  ons-input {
    height: 10%;
    width: 98%;
  }
  .answer {
    height: 100%;
  }
  .next {
    width: 100%
  }
  .next-button {
    text-align: center;
    width: 100%
  }
  .answered {
    text-align: center
  }
  .answered-pron {
    color: #6E6E6E;
    font-size: 30px
  }
  .answered-en {
    margin: 10px;
    font-weight: bold;
    color: #FF0080;
    font-size: 80px
  }
  .corrected {
    color: #0080FF;
  }
  .incorrected {
    color: #FF0080;
  }
  .answered-ja {
    font-size: 30px;
    font-weight: bold;
  }
</style>
