<style scoped>
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

    /*.vux-header {*/
        /*background: #fec142;*/
    /*}*/
    /*.vux-header-back{*/
        /*color: #fff;*/
    /*}*/
    /*.vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button {*/
        /*color: #fff !important;*/
    /*}*/

    /*.vux-header .vux-header-left .left-arrow:before {*/
        /*border: 1px solid #fff !important;*/
        /*border-width: 1px 0 0 1px !important;*/
    /*}*/


    .create-room span {
        margin: 0 10px;
        background: #ffc107;
        display: block;
        color: #fff;
        font-size: 50px;
        font-weight: 500;
    }
</style>
<template>
    <div id="app">
        <toast v-model="$store.state.show_error_msg" style="color: white;z-index: 1000;" type="text" :time="1000" is-show-mask :text="$store.state.error_msg" position="default"></toast>
        <x-header v-show="$route.meta.show_header" :title="$route.meta.title"></x-header>

        <div v-show="$store.state.show_menu">
            <tabbar style="position: fixed;">
                <tabbar-item link="/">
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item link="/hot/rooms/">
                    <span slot="label">热门房间</span>
                </tabbar-item>
                <tabbar-item class="create-room" link="/create/room/">
                    <span slot="label">+</span>
                </tabbar-item>
                <tabbar-item link="/winner">
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

