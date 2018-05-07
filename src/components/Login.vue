<style scoped="">
    .login-box {
        padding: 10%;
        text-align: center;
        margin-top: 15%;
    }

    .login-box .tz-input {
        border: 1px solid #abb4c3;
        margin-bottom: 20px;
        color: #333;
    }

    .login-box .tz-input img {
        padding-right: 10px;
        display: block;
        width: 20px;
    }

    .login-box .login-button {
        background-color: #ffc107;
        margin-top: 20px;
    }

    .login-box .register-button {
        background-color: #10aeff;
    }

    .login-box .logo {
        width: 50%;
        border-radius: 50%;
        margin-bottom: 40px;
    }

</style>
<template>
    <div class="login-box">
        <img class="logo" src="../../src/assets/logo.png" alt="">
        <x-input class="tz-input" type="tel" placeholder="请输入手机号">
            <img slot="label" src="../../src/assets/account.png" width="24" height="24">
        </x-input>

        <x-input class="tz-input" type="password" placeholder="请输入密码">
            <img slot="label" src="../../src/assets/password.png" width="24" height="24">
        </x-input>
        <p style="text-align: right"><u style="color: red;">忘记密码</u></p>
        <x-button class="login-button" type="primary">登录</x-button>
        <x-button class="register-button" type="primary">立即注册</x-button>
    </div>
</template>

<script>
    import {XInput, XButton} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                game_tel: '',
                game_password: '',
            }
        },
        created: function (event) {
        },
        methods: {
            login() {
                this.$store.state.show_menu = false
                let data = new FormData()
                data.append('tel', this.game_tel)
                data.append('password', this.game_password)
                this.axios.post(this.$store.state.base_url + 'user/login/', data)
                .then((response) => {
                        if (response.code === 404) {
                            this.set_error_msg(response.msg)
                            return false
                        }
                        let tztoken = response.data.tztoken;
                        cookie.set('tztoken', tztoken, 30)
                        this.$store.state.user.id = response.data.id
                        this.$store.state.user.invite_code = response.data.invite_code
                        this.$store.state.user.tel = response.data.tel
                        this.$store.state.user.nickname = response.data.nickname
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


