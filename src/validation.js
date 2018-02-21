import Vue from 'vue'
import Validator from 'vue-validator'
Vue.use(Validator)
Vue.validator('phone', function (val) {
    return /^[0-9]{11}$/.test(val)
});

