import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// import dropdown from 'vue-dropdowns';
import 'bootstrap'; import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButton from 'vue-js-toggle-button';
import Multiselect from 'vue-multiselect';

Vue.component('multiselect', Multiselect);
Vue.use(ToggleButton);

axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");