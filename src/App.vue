<style scoped="">
    @import '/static/css/main.css';
    @import '//at.alicdn.com/t/font_500566_bjrs7ewc16as8aor.css';

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

    .vux-header {
        background: #35495e00;
    }
</style>
<style>
    .vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button {
        color: #fff !important;
    }

    .vux-header .vux-header-left .left-arrow:before {
        border: 1px solid #fff !important;
        border-width: 1px 0 0 1px !important;
    }
</style>
<template>
    <div id="app">
        <toast v-model="$store.state.show_error_msg" style="color: white;z-index: 1000;" type="text" :time="1000" is-show-mask :text="$store.state.error_msg" position="default"></toast>
        <x-header style="coloe:#fff;" title="标题"></x-header>

        <div v-show="$store.state.show_menu">
            <tabbar style="position: fixed;">
                <tabbar-item link="/">
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item link="/">
                    <span slot="label">热门房间</span>
                </tabbar-item>
                <tabbar-item link="/">
                    <span slot="label">领取奖励</span>
                </tabbar-item>
                <tabbar-item badge="2" style="border-left: 1px solid #f0f0f0;" link="/user/">
                    <span slot="label">个人中心</span>
                </tabbar-item>
            </tabbar>
        </div>
        <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<script>


    import {Tabbar, TabbarItem, Group, Cell, Toast, Loading, XHeader} from 'vux'

    export default {
        name: 'app',
        data() {
            return {
                show_menu: false,
                error: ''
            }
        },
        components: {
            Toast,
            Loading,
            Tabbar,
            TabbarItem,
            Group,
            Cell,
            XHeader
        },
        created: function (event) {
        },
    }

</script>

