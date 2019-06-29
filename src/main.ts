import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import createStore from "./store/";
import "./registerServiceWorker";
import "reflect-metadata";

Vue.config.productionTip = false;

new Vue({
  router,
  store: createStore(),
  render: h => h(App)
}).$mount("#app");
