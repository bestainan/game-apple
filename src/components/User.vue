<style>

    .user-box {
        position: fixed;
        top: 0;
        width: 100%;
    }

    .top p {
        font-size: 20px;
        color: #fff;
    }

    .vux-header {
        z-index: 100;
    }

    .avatar {
        border: 1px solid;
        width: 100px;
        height: 100px;
        margin-top: 80px;
        border-radius: 50%;
    }

    .money {
        padding: 20px;
        padding-top: 0;
    }

    .money p {
        border-bottom: 1px solid #cccccc;
        line-height: 3;
        margin: 0;
    }

    .buttons {
        padding: 20px;
        padding-top: 0;
        margin-bottom: 30px;
    }

    .weui-grid {
        padding: 0 !important;

    }

    .weui-grid__icon {
        width: 70px !important;
        height: 70px !important;
        padding-top: 20px !important;
    }

    .weui-grid__label span {
        font-size: 18px;
        font-weight: 100;
    }

    .weui-grid:before {
        border-right: none !important;
    }

    .weui-grid:after {
        border-bottom: none !important;
    }

    .weui-grids:before {
        border-top: none !important;
    }

    .weui-grids:after {
        border-left: none !important;
    }
    .vux-header{
        display: none !important;
    }
</style>
<template>
    <div class="user-box">
        <p style="padding-left: 20px;">{{user.nickname || '九星金服'}}</p>
        <div class="money">
            <p>已赚取奖励：1211</p>
            <p>
                <span>可提现金额：{{user.money}}</span>
                <x-button mini type="warn" style="float: right;margin-top: 10px;">提现</x-button>
            </p>
        </div>
        <div class="buttons">
            <grid>
                <grid-item label="点卡充值" @click.native="go_path('BuyCard')">
                    <img slot="icon" src="/static/img/chongzhi.png">
                </grid-item>
                <grid-item label="消息通知" @click.native="go_path('Mail')">
                    <img slot="icon" src="/static/img/xiaoxi.png">
                </grid-item>
                <grid-item label="历史参与" @click.native="go_path('History')">
                    <img slot="icon" src="/static/img/lishi.png">
                </grid-item>
            </grid>
            <grid>
                <grid-item label="我的分享" @click.native="go_path('Invite')">
                    <img slot="icon" src="/static/img/fenxiang.png">
                </grid-item>
                <grid-item label="修改密码" @click.native="go_path('ForgetPassword')">
                    <img slot="icon" src="/static/img/xiugaimima.png">
                </grid-item>
                <grid-item label="退出登录" @click.native="logout()">
                    <img slot="icon" src="/static/img/tuichu.png">
                </grid-item>
            </grid>
        </div>
    </div>
</template>

<script>
    import {cookie, XButton, Grid, GridItem} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                user:{}
            }
        },
        created: function (event) {
            this.$store.state.show_menu = true
            this.axios.get(this.$store.state.base_url + 'user/info/').then((response) => {
                    this.user = response;
                }
            );
        },

        methods: {
            logout() {
                this.$store.state.show_menu = false
                this.$router.push({
                    name: 'Login',
                })
            },
            go_path(name) {
                this.$router.push({
                    name: name,
                })
            },

        },
        components: {
            cookie, XButton, Grid, GridItem
        }
    }
</script>


