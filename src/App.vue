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
</style>
<template>
    <div id="app">
        <toast v-model="$store.state.show_error_msg" style="color: white;z-index: 1000;" type="text" :time="1000" is-show-mask :text="$store.state.error_msg" position="default"></toast>
        <div v-show="$store.state.show_menu">
            <tabbar style="position: fixed">
                <tabbar-item link="/">
                    <span slot="label">首页</span>
                </tabbar-item>
                <!--<tabbar-item badge="2" style="border-left: 1px solid #f0f0f0;" link="/rank/">-->
                <!--<span slot="label">排行</span>-->
                <!--</tabbar-item>-->
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
            Cell
        },
        created: function (event) {},
    }

</script>

