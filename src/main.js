// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import store from './store/index'
import util from './utils'
import VueWechatTitle from 'vue-wechat-title';
import VueAxios from 'vue-axios'
import axios from 'axios'

const FastClick = require('fastclick')
FastClick.attach(document.body)


Vue.use(VueAxios, axios);
Vue.use(VueRouter);

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(util);
Vue.use(VueWechatTitle)


new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
})
