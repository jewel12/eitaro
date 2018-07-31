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

    <v-ons-bottom-toolbar modifier="aligned">
      <a href="https://github.com/jewel12/eitaro" class="about">about</a>
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
  .about {
    text-weight: bold;
    text-decoration: none;
    color: black;
  }
</style>
