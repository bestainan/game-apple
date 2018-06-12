<style>
    .register-box {
        padding: 10%;
        padding-top: 60%;
        margin-top: -60px;
        text-align: center;
        background-image: url(/static/img/zhucetu.png);
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .register-box .tz-input {
        border: 1px solid #abb4c3;
        margin-bottom: 20px;
        color: #333;
    }

    .register-box .tz-input img {
        padding-right: 10px;
        display: block;
        width: 20px;
    }

    .register-box .login-button {
        background-color: #ffc107;
    }

    .code-input {
        width: 45%;
        float: left;
    }

    .register-box .code-button {
        width: 40% !important;
        background-color: #ffc107 !important;
        float: right;
    }

    .weui-cell__bd .weui-label {
        width: 100%;
        font-size: 15px;
    }

    .weui-cells:before {
        border-top: 1px solid white !important;
    }

    .weui-cells:after {
        border-bottom: 1px solid white !important;
    }

    .vux-x-switch.weui-cell_switch {
        padding-left: 0;
    }

    .weui-btn + .weui-btn {
        margin-top: 0 !important;
    }

</style>
<template>
    <div class="register-box">
        <x-input class="tz-input" type="tel" v-model="submit_form.tel" placeholder="请输入手机号">
            <img slot="label" src="../../src/assets/account.png" width="24" height="24">
        </x-input>
        <x-input class="tz-input" type="password" v-model="submit_form.password1" placeholder="请输入6-18位数字，字母密码">
            <img slot="label" src="../../src/assets/password.png" width="24" height="24">
        </x-input>
        <x-input class="tz-input" type="password" v-model="submit_form.password2" placeholder="输入确认密码">
            <img slot="label" src="../../src/assets/account.png" width="24" height="24">
        </x-input>
        <x-input class="tz-input code-input" v-model="submit_form.captcha" type="text" placeholder="验证码">
            <img slot="label" src="../../src/assets/yanzhengma.png" height="24">
        </x-input>
        <x-button v-show="count<60" class="code-button" type="primary">{{count}}s</x-button>
        <x-button v-show="count>=60" class="code-button" @click.native="get_captcha" type="primary">发送验证码</x-button>
        <div class="clear"></div>
        <group>
            <x-switch title="<p style='width: 240px;font-size: 15px;text-align: left'>我已阅读并接受《用户注册协议》</p>" v-model="is_read"></x-switch>
        </group>
        <x-button class="login-button" type="primary" @click.native="submit">注册</x-button>
    </div>
</template>

<script>
    import {XInput, XButton, XSwitch, Group} from 'vux'

    export default {
        name: 'register',
        data() {
            return {
//              归零
                step: 1,
                captcha_text: '发送验证码',
                count: 60,
                is_read: false,
                submit_form: {
                    captcha: '',
                    tel: '',
                    password1: '',
                    password2: '',
                    invite_code:'',
                }

            }
        },
        mounted: function () {
            this.invite_code = this.$route.query.invite_code
        },
        methods: {
            times() {
                if (!this.timer) {
                    this.timer = setInterval(() => {
                        if (this.count > 0) {
                            this.count--;
                        } else {
                            this.count = 60;
                            clearInterval(this.timer);
                        }
                    }, 1000)
                }
            },
            submit() {
                if (!this.is_read){
                    this.set_error_msg('还没同意注册协议')
                    return false
                }
                let data = new FormData()
                for (let key in this.submit_form) {
                    data.append(key, this.submit_form[key]);
                }
                this.axios.post(this.$store.state.base_url + 'user/register/', data).then((response) => {
                        let data = response
                        if (data.code !== 1) {
                            this.set_error_msg(data.msg)
                        } else {
                            this.$router.push({
                                name: 'Home',
                            })
                        }
                    }
                )
            },
            get_captcha() {
                if (!this.submit_form.tel) {
                    this.set_error_msg('手机号不能为空');
                    return false
                }
                this.count--;
                this.times();
                let data = new FormData();
                data.append('tel', this.submit_form.tel);
                this.axios.post(this.$store.state.base_url + 'user/phone/code/', data).then((response) => {
                        let data = response;

                        if (data.code !== 1) {
                            this.set_error_msg(data.msg);
                            return false
                        } else {
                        }
                    }
                );
            }
        },
        components: {
            XButton, XInput, XSwitch, Group
        }
    }
</script>


