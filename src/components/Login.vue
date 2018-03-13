<style scoped="">
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

    .custom-primary-red {
        border-color: #CE3C39 !important;
        color: #CE3C39 !important;
    }
</style>
<template>
    <div class="login-box">
        {{err}}
        <grid>
            <grid-item class="logo">
                <img src="../assets/logo.jpeg" style="width: 150px;" alt="">
            </grid-item>
        </grid>
        <grid>
            <grid-item class="form">
                <x-input type="tel" title="手机" v-model="game_tel"></x-input>
                <x-input type="password" title="密码" v-model="game_password"></x-input>
            </grid-item>
        </grid>
        <grid>
            <grid-item class="form">
                <x-button plain type="primary" @click.native="login">登录</x-button>
                <x-button plain class="custom-primary-red" @click.native="go_register">注册</x-button>
            </grid-item>
        </grid>
    </div>
</template>

<script>
    import {XInput, XButton, Grid, GridItem} from 'vux'
    import axios from 'axios'
    export default {
        name: 'login',
        data() {
            return {
                game_tel: '',
                err: '',
                game_password: '',
            }
        },
        created: function (event) {},
        methods: {
            login() {
                let data = new FormData()
                data.append('tel', this.game_tel)
                data.append('password', this.game_password)
                this.err = '1'
                axios.post(this.$store.state.base_url + 'user/login/', data)
                .then((response) => {
                        this.err = '2'
                        if (response.data.code === 404) {
                            this.set_error_msg(response.data.msg)
                            return false
                        }
                        let token = response.data.data.token;
                        this.setCookie('token', token, 7)
                        this.$store.state.user.id = response.data.data.id
                        this.$store.state.user.invite_code = response.data.data.invite_code
                        this.$store.state.user.tel = response.data.data.tel
                        this.$store.state.user.nickname = response.data.data.nickname
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
            XButton,
            Grid,
            GridItem
        }
    }
</script>


