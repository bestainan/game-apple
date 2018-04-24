import store from './store/index.js'
import {cookie} from 'vux'
const set_error_msg = function (msg) {
    store.state.error_msg = msg;
    store.state.show_error_msg = true;
};
//
// const convert_code = function (data) {
//     // alert($.parseJSON(decodeURIComponent(escape(JSON.stringify(data)))).name)
//
//     if (store.state.is_iphone) {
//         return $.parseJSON(decodeURIComponent(escape(JSON.stringify(data))))
//     } else {
//         return data
//     }
// }

import axios from 'axios'

// const setCookie = function (cname, cvalue, exdays) {
//     let d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + "; " + expires;
// };
// //获取cookie
// const getCookie = function (cname) {
//     let name = cname + "=";
//     let ca = document.cookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) === ' ') c = c.substring(1);
//         if (c.indexOf(name) !== -1)
//             return c.substring(name.length, c.length);
//     }
//     return "";
// };
// const getUrlParam = function (name) {
//     let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//     let r = window.location.search.substr(1).match(reg);  //匹配目标参数
//     if (r !== null) return unescape(r[2]);
//     return null; //返回参数值
// }
//
//
// // 请求配置
// const ALL_Path = [
//     "http://127.0.0.1",
//     "http://localhost",
//     "http://47.92.127.186",
//     "http://test.paquapp.com",
//     "http://api.paquapp.com",
// ]
//
// axios.defaults.withCredentials = true
axios.interceptors.request.use(
    config => {
        if (config.method === 'post' || config.method === 'patch') {
            config.data.append('tztoken', cookie.get('tztoken'))
        } else if (config.method === 'get' || config.method === 'delete') {
            console.log(config.params);
            config.params = {
                tztoken: cookie.get('tztoken'),
                ...config.params
            }
        }
        return config
    }, function (error) {
        return Promise.reject(error)
    }
)
import router from './router'

axios.interceptors.response.use((response) => {
    let data = response.data
    if (data.code === 10001){
        router.push({
            name: 'Login',
        })
    }
    return data

}, (err) => {})
// const ChangePage = function (val) {
//     store.state.offset = (val-1) * 10;
// }
//
// const upload_policy_handle = async function (file) {
//     let res = await this.axios.get(store.state.policy_url + '?name=' + file.name + '&pic_type=itemdes');
//     let data = res.data.data;
//     store.state.upload_policy = {
//         "key": data.key,
//         "policy": data.policy,
//         "OSSAccessKeyId": data.OSSAccessKeyId,
//         "success_acction_status": 200,
//         "signature": data.signature,
//     }
//     store.state.policys[file.name] = store.state.upload_policy
//     return store.state.upload_policy
// }
//
// const OssUpload = async function (file,policy) {
//     let formData = new FormData();
//     formData.append('key', policy.key);
//     formData.append('policy', policy.policy);
//     formData.append('OSSAccessKeyId', policy.OSSAccessKeyId);
//     formData.append('success_acction_status', 200);
//     formData.append('signature', policy.signature);
//     formData.append('file', file);
//     let config = {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     };
//
//     return await this.axios.post(this.$store.state.oss_base_url, formData, config);
// }
//
export default {
    install(Vue, options) {
        Vue.prototype.set_error_msg = set_error_msg;
        // Vue.prototype.convert_code = convert_code;
        // Vue.prototype.setCookie = setCookie;
        // Vue.prototype.getCookie = getCookie;
        // Vue.prototype.getUrlParam = getUrlParam;
        // Vue.prototype.$axios = axios;
        // Vue.prototype.change_page = ChangePage;
        // Vue.prototype.upload_policy_handle = upload_policy_handle;
        // Vue.prototype.upload_to_oss = OssUpload;

    }
}
