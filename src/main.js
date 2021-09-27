import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import "normalize.css/normalize.css"; //css resets
import "@/styles/index.scss"; // global css

import "./permission"; // 路由导航守卫
import './icons'; //icon

import scrollBar from '@/components/scrollBar';
import '@/components/scrollBar/index.scss';
Vue.component('scroll-bar', scrollBar);

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
