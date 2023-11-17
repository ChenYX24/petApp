import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex';
import tabbar from '@/store/tabbar';

Vue.config.productionTip = false
Vue.use(Vuex);
App.mpType = 'app'
const store = new Vuex.Store({
  modules: {
    tabbar
  }
});
Vue.prototype.$store = store;
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

