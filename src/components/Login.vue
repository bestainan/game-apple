<style>
    #login-box {
        padding: 10%;
        text-align: center;
        margin-top: 15%;
    }

    #login-box .tz-input {
        border: 1px solid #abb4c3;
        margin-bottom: 20px;
        color: #333;
    }

    #login-box .tz-input img {
        padding-right: 10px;
        display: block;
        width: 20px;
    }

    #login-box .login-button {
        background-color: #ffc107;
        margin-top: 20px;
    }

    #login-box .register-button {
        background-color: #10aeff;
    }

    #login-box .logo {
        width: 50%;
        border-radius: 50%;
        margin-bottom: 40px;
    }

</style>
<template>
    <div id="login-box">
        <img class="logo" src="../../src/assets/logo.png" alt="">
        <x-input class="tz-input" v-model="game_tel" type="tel" placeholder="请输入手机号">
            <img slot="label" src="../../src/assets/account.png" width="24" height="24">
        </x-input>

        <x-input class="tz-input" v-model="game_password" type="password" placeholder="请输入密码">
            <img slot="label" src="../../src/assets/password.png" width="24" height="24">
        </x-input>
        <p style="text-align: right"><u style="color: red;">忘记密码</u></p>
        <x-button class="login-button" @click.native="login" type="primary">登录</x-button>
        <x-button class="register-button" @click.native="go_register" type="primary">立即注册</x-button>
    </div>
</template>

<script>
    import {XInput, XButton,cookie} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                game_tel: '',
                game_password: '',
            }
        },
        created: function (event) {
            this.$store.state.show_menu = false
        },
        methods: {
            login() {
                let data = new FormData()
                if (!this.game_tel || !this.game_password) {
                    this.set_error_msg('请输入账号密码')
                    return false
                }
                data.append('tel', this.game_tel)
                data.append('password', this.game_password)
                this.axios.post(this.$store.state.base_url + 'user/login/', data)
                .then((response) => {
                        let data = response
                        if (data.code === 404) {
                            this.set_error_msg(response.msg)
                            return false
                        }
                        this.$router.push({
                            name: 'Home',
                        })

                    }
                ).catch(function (error) {
                    console.log(error);
                })
            },
            go_path(id) {
                this.$router.push({
                    name: 'Mail',
                })
            },
            go_register() {
                this.$router.push({
                    name: 'Register',
                })
            }
        },
        components: {
            XInput,
            XButton
        }
    }
</script>


