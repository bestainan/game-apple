import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'

Vue.use(Vuex);
const state = {
    is_alived: true,
    // base_url: 'http://192.168.0.104:8000/',
    base_url: 'http://tzadmin.jiuxingjinfu.cn/',
    show_menu:'',
    error_msg: '',
    show_error_msg: false,
    user:{
        id:'',
        tel:'',
        nickname:'',
        invite_code:'',
    }
};


export default new Vuex.Store({
    // 定义状态
    state: state,
    actions: actions
})

