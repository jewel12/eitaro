<template id="main-page">
  <div id="app">
    <router-view></router-view>
  </div>
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
