<template>
  <div id="app">
    <header-tab></header-tab>
    <h2>{{msg}}</h2>
    <div class="nav-list">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderTab from './components/header.vue';
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome tu your Vue.js App'
    }
  },
  components: {
    HeaderTab
  }
}
</script>

<style lang="css">
</style>
