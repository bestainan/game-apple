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


</style>
<template>
    <div class="register-box">
        <!--<img src="/static/img/zhucetu.png" alt="">-->
        <x-input class="tz-input" type="tel" v-model="submit_form.tel" placeholder="请输入手机号">
            <img slot="label" src="../../src/assets/account.png" width="24" height="24">
        </x-input>
        <x-input class="tz-input" type="password" v-model="submit_form.password1" placeholder="请输入6-18位数字，字母密码">
            <img slot="label" src="../../src/assets/password.png" width="24" height="24">
        </x-input>
        <x-input class="tz-input" type="password" v-model="submit_form.password2" placeholder="输入确认密码">
            <img slot="label" src="../../src/assets/account.png" width="24" height="24">
        </x-input>
        <x-input class="tz-input code-input" type="text" v-model="submit_form.captcha" placeholder="验证码">
            <img slot="label" src="../../src/assets/yanzhengma.png" height="24">
        </x-input>
        <x-button class="code-button" type="primary"  @click.native="get_captcha">获取验证码</x-button>
        <div class="clear"></div>
        <x-button class="login-button" @click.native="submit" type="primary">确认修改</x-button>
    </div>
</template>

<script>
    import {XInput, XButton, XSwitch, Group} from 'vux'

    export default {
        name: 'register',
        data() {
            return {
                v_code_text: '发送验证码',
                count: 60,
                is_read: false,
                submit_form: {
                    captcha: '',
                    tel: '',
                    password1: '',
                    password2: '',
                }

            }
        },
        mounted: function () {
            this.submit_form.invite_code = this.$route.query.invite_code
        },
        methods: {
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
            },
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
                let data = new FormData()
                for (let key in this.submit_form) {
                    data.append(key, this.submit_form[key]);
                }
                this.axios.post(this.$store.state.base_url + 'user/register/', data).then((response) => {
                        let data = response
                        if (data.code !== 1) {
                            this.set_error_msg(data.msg)
                        } else {
                            console.log(data.data)
                            let token = data.data.token;
                            this.$store.state.user.tel = data.data.tel
                            this.$store.state.user.id = data.data.id
                            this.$router.push({
                                name: 'Home',
                            })
                        }
                    }
                )
            },
        },
        components: {
            XButton, XInput, XSwitch, Group
        }
    }
</script>


