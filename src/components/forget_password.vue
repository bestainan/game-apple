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
    .weui-cell__bd .weui-label{
        width: 100%;
        font-size: 15px;
    }
    .weui-cells:before{
        border-top: 1px solid white !important;
    }
    .weui-cells:after{
        border-bottom: 1px solid white !important;
    }
    .vux-x-switch.weui-cell_switch{
        padding-left: 0;
    }


</style>
<template>
    <div class="register-box">
        <!--<img src="/static/img/zhucetu.png" alt="">-->
        <x-input class="tz-input" type="tel" placeholder="请输入手机号">
            <img slot="label" src="../../src/assets/account.png" width="24" height="24">
        </x-input>
        <x-input class="tz-input" type="password" placeholder="请输入6-18位数字，字母密码">
            <img slot="label" src="../../src/assets/password.png" width="24" height="24">
        </x-input>
        <x-input class="tz-input" type="password" placeholder="输入确认密码">
            <img slot="label" src="../../src/assets/account.png" width="24" height="24">
        </x-input>
        <x-input class="tz-input code-input" type="text" placeholder="验证码">
            <img slot="label" src="../../src/assets/yanzhengma.png" height="24">
        </x-input>
        <x-button class="code-button" type="primary">获取验证码</x-button>
        <div class="clear"></div>
        <group>
            <x-switch title="<p style='width: 240px;font-size: 15px;text-align: left'>我已阅读并接受《用户注册协议》</p>" v-model="is_read"></x-switch>
        </group>
        <x-button class="login-button" type="primary">确认修改</x-button>
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
                v_code_text: '发送验证码',
                count: 60,
                is_read:false,
                submit_form: {
                    v_code: '',
                    bank_type: 'bank',
                    tel: '',
                    password1: '',
                    password2: '',
                    nickname: '',
                    alipay_name: '',
                    alipay_account: '',
                    bank_name: '',
                    card_account: '',
                    card_name: '',
                    invite_code: ''
                }

            }
        },
        mounted: function () {
            this.submit_form.invite_code = this.$route.query.invite_code
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
            check_phone_code() {
                if (this.step === 1) {
                    let data = new FormData()
                    for (let key in this.submit_form) {
                        data.append(key, this.submit_form[key]);
                    }
                    this.axios.post(this.$store.state.base_url + 'user/register/', data).then((response) => {
                            console.log(response)
                            if (response.code !== 1) {
                                this.set_error_msg(response.msg)
                            } else {
                                console.log(response.data)
                                let token = response.data.token;
                                cookie('tztoken', token, 30)
                                this.$store.state.user.tel = response.data.tel
                                this.$store.state.user.nickname = response.data.nickname
                                this.$store.state.user.id = response.data.id
                                this.$store.state.user.invite_code = response.data.invite_code
                                this.$router.push({
                                    name: 'Home',
                                })
                            }
                        }
                    )
                } else {
                    if (!this.submit_form.v_code) {
                        this.set_error_msg('请填写验证码');
                        return false
                    } else {
                        this.axios.get(this.$store.state.base_url + 'user/phone/code/?code=' + this.submit_form.v_code + '&tel=' + this.submit_form.tel).then((response) => {
                                if (response.code !== 1) {
                                    this.set_error_msg(response.msg)
                                } else {
                                    this.step++
                                }
                            }
                        )
                    }
                }
            },
            get_v_code() {
                if (!this.submit_form.tel) {
                    this.set_error_msg('手机号不能为空');
                    return false
                }
                this.count--;
                this.times();
                let data = new FormData();
                data.append('tel', this.submit_form.tel);
                let that = this;
                this.axios.post(this.$store.state.base_url + 'user/phone/code/', data).then((response) => {
                        let data = response;
                        if (data.code !== 1) {
                            that.set_error_msg(data.msg);
                            return false
                        } else {
                        }
                    }
                );
                that.set_error_msg('发送成功')
            }
        },
        components: {
            XButton, XInput, XSwitch, Group
        }
    }
</script>


