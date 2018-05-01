<style scoped="">
    .register-box {
        padding: 20px 10px;
    }

    .weui-grid.logo {
        text-align: center;
    }

    .login-box {
        margin-top: 25%;
    }

    .weui-grids:before {
        border-top: none;
    }

    .weui-grid:after {
        border-bottom: none
    }


    .weui-label {
        width: 200px !important;
    }

    .vux-button-group {
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .vux-step {
        margin-top: 50px;
    }
    .vux-step-item-main.vux-step-item-main-process{
        color: rgb(247, 247, 247) !important;
    }
</style>
<template>
    <div class="register-box">
        <grid>
            <grid-item class="form">
                <step v-model="step" gutter="20px" background-color='rgb(247, 247, 247)'>
                    <step-item style="background-color: rgb(247, 247, 247)" :title="'验证手机'"></step-item>
                    <step-item style="background-color: rgb(247, 247, 247)" :title="'基本资料'"></step-item>
                </step>
            </grid-item>
        </grid>
        <div class="form">
            <grid v-show="step==0">
                <grid-item>
                    <group>
                        <x-input type="tel" label-width="6em" title="手机号" v-model="submit_form.tel"></x-input>
                        <x-input :title="v_code_text" v-model="submit_form.v_code" label-width="6em" class="weui-vcode" :show-clear="false">
                            <x-button slot="right" :disabled="count !== 60" type="primary" mini @click.native="get_v_code">{{ count == 60 ? '发送验证码' : count + ' 秒' }}</x-button>
                        </x-input>
                    </group>
                </grid-item>
            </grid>
            <grid v-show="step==1">
                <grid-item>
                    <group>
                        <x-input type="text" label-width="6em" title="昵称" v-model="submit_form.nickname"></x-input>
                        <x-input type="text" label-width="6em" title="邀请人" v-model="submit_form.invite_code"></x-input>
                        <x-input type="password" label-width="6em" title="密码" v-model="submit_form.password1"></x-input>
                        <x-input type="password" label-width="6em" title="确认密码" v-model="submit_form.password2"></x-input>
                    </group>
                    <button-tab>
                        <button-tab-item selected @on-item-click="submit_form.bank_type='bank'">银行卡</button-tab-item>
                        <button-tab-item @on-item-click="submit_form.bank_type='alipay'">支付宝</button-tab-item>
                    </button-tab>
                    <group v-show="submit_form.bank_type=='alipay'">
                        <x-input type="text" label-width="6em" title="姓名" v-model="submit_form.alipay_name"></x-input>
                        <x-input type="text" label-width="6em" title="支付宝账号" v-model="submit_form.alipay_account"></x-input>
                    </group>
                    <group v-show="submit_form.bank_type=='bank'">
                        <x-input type="text" label-width="6em" title="姓名" v-model="submit_form.card_name"></x-input>
                        <x-input type="text" label-width="6em" title="卡号" v-model="submit_form.card_account"></x-input>
                        <x-input type="text" label-width="6em" title="开户行" v-model="submit_form.bank_name"></x-input>
                    </group>
                </grid-item>
            </grid>
        </div>
        <div class="btn_wrap">
            <x-button plain type="primary" @click.native="check_phone_code">{{ this.step == '0' ? '下一步' : '提交'}}</x-button>
        </div>
    </div>
</template>

<script>
    import {Step, StepItem, XButton, XInput, ButtonTab, ButtonTabItem,GridItem,Grid, Group,cookie} from 'vux'

    export default {
        name: 'register',
        data() {
            return {
//              归零
                step: 0,
                v_code_text: '发送验证码',
                count: 60,
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
            Step, StepItem, XButton, XInput, ButtonTab, ButtonTabItem,GridItem, Grid,Group
        }
    }
</script>


