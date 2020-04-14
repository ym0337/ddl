import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import * as io from '@/socket/socket.io.js';
// let socketUrl = 'http://localhost:3013';
let socketUrl = 'http://119.29.94.99:3013';
Vue.prototype.$socket = io.connect(socketUrl);

// 引入委托名称对应关系表
import distList from '../public/config/dist.js'
Vue.prototype.$distList = distList;

Vue.config.productionTip = false;

Vue.use(ElementUI);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
