<template id="main-page">
  <v-ons-page>
    <v-ons-toolbar>
      <v-ons-toolbar>
        <div class="center">{{ title }}</div>
        <div class="right">
          <v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
        </div>
      </v-ons-toolbar>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-list-item
        modifier="chevron" tappable
        @click="$router.push('preps')"
        class="game-select"
      >PUBG (PREPOSITIONS UNKNOWN'S BATTLEGROUNDS</v-ons-list-item>
    </v-ons-list>

    <iframe src="/static/wasm_exec.html" frameborder="0" class="wasm"></iframe>
    <v-ons-bottom-toolbar>
      about
    </v-ons-bottom-toolbar>
    <router-view></router-view>
  </v-ons-page>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        title: 'EITARO'
      }
    }
  }
</script>

<style>
  .game-select {
    font-weight: bold;
  }
  .wasm {
    position: fixed;
    height: 100%;
    width: 100%;
  }
</style>
