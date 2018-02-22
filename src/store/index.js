import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'

Vue.use(Vuex);
const state = {
    is_alived: true,
    base_url: 'http://tzadmin.jiuxingjinfu.cn/',
    error_msg: '',
    show_error_msg: false,
    user:{
        tel:'',
        nickname:'',
    }
};


export default new Vuex.Store({
    // 定义状态
    state: state,
    actions: actions
})

