<style scoped="">
    @import '/static/css/main.css';
    @import '//at.alicdn.com/t/font_500566_bjrs7ewc16as8aor.css';

</style>
<template>
    <div id="app">
        <toast :width="$store.state.toast_width" v-model="$store.state.show_error_msg" style="color: white;z-index: 1000;" type="text" :time="1000" is-show-mask :text="$store.state.error_msg" position="default"></toast>
        <div v-show="$route.path != '/register/' && $route.path != '/login/' && $route.path != '/'">
            <tabbar style="position: fixed">
                <tabbar-item link="/home/">
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item badge="2" style="border-left: 1px solid #f0f0f0;" link="/user/">
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </div>
        <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<script>


    import {Tabbar, TabbarItem, Group, Cell, Toast, Loading} from 'vux'

    export default {
        name: 'app',
        data() {
            return {
                show_menu: false
            }
        },
        components: {
            Toast,
            Loading,
            Tabbar,
            TabbarItem,
            Group,
            Cell
        },
        created: function (event) {
            let token = this.getCookie('token');
            this.axios.get(this.$store.state.base_url + 'user/token/?token=' + token).then((response) => {
                    if (response.data.code !== 1) {
                        this.$router.push({
                            name: 'Login',
                        })
                    } else {
                        this.$store.state.user.tel = response.data.tel
                        this.$store.state.user.nickname = response.data.nickname
                        this.$router.push({
                            name: 'Home',
                        })
                    }
                }
            )
            if (token) {
                this.$router.push({
                    name: 'Home',
                })
            }
        },
    }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }
</style>
