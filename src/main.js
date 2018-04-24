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
import VueClipboard from 'vue-clipboard2'
import vueUploadWeb from 'vue-upload-web'

Vue.use(vueUploadWeb)
Vue.use(VueClipboard)

const FastClick = require('fastclick');
FastClick.attach(document.body);


Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(cookie);
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(util);
Vue.use(VueWechatTitle);

import {cookie} from 'vux'

router.beforeEach((to, from, next) => {
    if (to.meta.require_login) {
        let token = cookie.get('tztoken');
        if (token) {
            axios.get(store.state.base_url + 'user/token/?tztoken=' + token)
            .then((response) => {
                console.log(response)
                    let data = response.data;
                    store.state.user = {
                        id: data.id,
                        tel: data.tel,
                        nickname: data.nickname,
                        invite_code: data.invite_code,
                        card: data.card
                    }
                }
            );
            next();
        } else {
            console.log(token)
            next({
                path: '/login',
                // query: {redirect: to.fullPath}
            })
        }
    } else {
        next()
    }
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
})
