import Vue from 'vue';
import App from './app.vue';
import router from './router.js'
Vue.config.debug = true;
new Vue({
  router,
  el: '#appIndex',
  render: h =>h(App)
})
