import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "font-awesome/css/font-awesome.css";
import "bootstrap-social/bootstrap-social.css";
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import store from './store/store';
import sanitizeHtml from 'sanitize-html';





Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(sanitizeHtml);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
