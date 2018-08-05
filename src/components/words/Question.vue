<template>
  <div class="question">
    <div class="question-cards">
      <v-ons-card
        class="status"
        v-bind:class="{ correct: hasAnswered && hasCorrected,
                        'in-correct': hasAnswered && !hasCorrected }">
        {{status}}
      </v-ons-card>
      <v-ons-card class="desc">
        {{desc}}
      </v-ons-card>
    </div>

    <div class="bottom">
      <div v-if="!hasAnswered">
        <v-ons-input placeholder="Answer" float v-model="input">
        </v-ons-input>
        <v-ons-button  @click="answer()">
          Go
        </v-ons-button>
      </div>
      <div v-else>
        <v-ons-button @click="next()">
          次へ
        </v-ons-button>
      </div>
    </div>
  </div>
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
        input: ''
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
    height: 100%;
  }
  .question-cards {
    height: 60%;
  }
  .status {
    height: 10%;
    font-weight: bolder;
  }
  .desc {
    height: 90%;
    font-size: 20px;
  }
  .bottom {
    margin: 5%;
    height: 40%;
  }
  .choice {
    height: 20%;
    margin: 2% 0;
  }
  .correct {
    background-color: dodgerblue;
  }
  .in-correct {
    background-color: orangered;
  }
</style>
