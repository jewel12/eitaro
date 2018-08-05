<template>
  <v-ons-card class="question">
    <v-ons-row vertical-align="top" class="status"
      v-bind:class="{ correct: hasAnswered && hasCorrected,
                        'in-correct': hasAnswered && !hasCorrected }">
      {{status}}
    </v-ons-row>
    <v-ons-row vertical-align="center" class="desc">
      <ons-col>
        <p class="word">{{desc}}</p>
        <div v-if="hasAnswered">
          <p class="word">{{en}}</p>
          <p class="word">{{pronunciation}}</p>
        </div>
      </ons-col>
    </v-ons-row>
    <div v-if="!hasAnswered">
      <v-ons-row vertical-align="bottom" class="input">
        <ons-col class="answer" width="90%">
          <v-ons-input placeholder="Answer" v-model="input" modifier="underbar">
          </v-ons-input>
        </ons-col>
        <ons-col width="10%">
          <v-ons-button @click="answer()">
            Go
          </v-ons-button>
        </ons-col>
      </v-ons-row>
    </div>
    <div v-else>
      <v-ons-button @click="next()">
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
          this.status = '正解'
          this.hasCorrected = true
        } else {
          this.status = '残念: ' + this.qa.en
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
  .input {
    height: 10%;
  }
  .answer {
    height: 100%;
  }

  .correct {
    background-color: dodgerblue;
  }
  .in-correct {
    background-color: orangered;
  }
</style>
