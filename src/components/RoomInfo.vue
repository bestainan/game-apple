<style>
    .m-img {
        padding-bottom: 33%;
        display: block;
        position: relative;
        max-width: 100%;
        background-size: cover;
        background-position: center center;
        cursor: pointer;
        border-radius: 2px;
    }
    .vux-x-input.weui-cell{
        height: 30px;
    }
    .weui-cell__hd label{
        margin-top: 3px;
    }
    .weui-cell__bd.weui-cell__primary  input{
        font-size: 18px;
        vertical-align: middle;
    }
    .m-title {
        color: #fff;
        text-align: center;
        text-shadow: 0 0 2px rgba(0, 0, 0, .5);
        font-weight: 500;
        font-size: 16px;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
        top: 50%;
        transform: translateY(-50%);
    }

    .m-time {
        font-size: 12px;
        padding-top: 4px;
        border-top: 1px solid #f0f0f0;
        display: inline-block;
        margin-top: 5px;
    }

    .m-title h3 {
        font-size: 20px;
    }

    .m-title span {
        color: #333;
        font-size: 14px;
    }

    .weui-label {
        font-size: 30px;
    }

    .weui-cell__primary {
        font-size: 34px;
        font-weight: bold;
    }

    .vux-x-input.weui-cell {
        padding-left: 0;
        padding-right: 0;

    }

    .weui-cell__bd p {
        margin: 0;
    }

    #title .weui-cell {
        height: 30px;
    }

    .info .pic {
        height: 200px;
    }

    .room-info-box .weui-tabbar__label {
        background: gold;
        color: #797979;
        font-size: 22px;
    }

    .room-info-box .weui-tabbar:before {
        border-top: 0;
    }

    .room-info-box > div > div.info > div > div:nth-child(2) > p span,
    .room-info-box > div > div.rank > div > div:nth-child(2) > p span {
        width: 48%;
        display: inline-block;
    }

    .room-info-box div div.info div div,
    .room-info-box div div.rank div div,
    .room-info-box div div.rule div div {
        padding: 0 10px
    }
    .get-money .weui-label{
        font-size: 18px;
    }
</style>
<template>
    <div class="room-info-box">
        <div>
            <div>
                <swiper :list="[{url: '',img: data.pic,title: data.name}]" :auto="true" :loop="true"></swiper>
            </div>
            <group class="info">
                <group-title>报名详情</group-title>
                <div>
                    <p>
                        <span>状态：{{data.status}}</span>
                        <span>报名费：{{data.apply_money}}</span>
                    </p>
                    <p>
                        <span>人数：{{data.current_count}}/{{data.max_count}}</span>
                        <span>房间号：{{data.id}}</span>
                    </p>
                </div>
            </group>
            <group class="rule">
                <group-title>规则</group-title>
                <div>
                    <p>{{data.des}}</p>
                </div>
            </group>
            <group class="rank">
                <group-title>排行</group-title>
                <div>
                    <p v-for="item in data.rank">
                        <span>{{item.name}}</span>
                        <span>第{{item.index}}名</span>
                    </p>
                </div>
            </group>
            <tabbar style="position: fixed;">
                <tabbar-item v-if='!data.has_apply' style="border-right: 1px solid #fff;" @click.native="show_apply=true">
                    <span slot="label" style="color: white;font-size: 20px;">报名</span>
                </tabbar-item>
                <tabbar-item v-if='!data.has_apply'>
                    <span slot="label" v-clipboard:copy="share_url" v-clipboard:success="onCopy" style="color: white;font-size: 20px;">分享</span>
                </tabbar-item>
                <tabbar-item v-if='data.has_apply'>
                    <span slot="label" style="color: white;font-size: 20px;">已报名</span>
                </tabbar-item>
            </tabbar>


            <popup class="get-money" title='aaa' v-model="show_apply" height="auto" is-transparent>
                <div style="background-color:#fff;height:210px;">
                        <!--<radio id="title" title="title" :options="options" v-model="deposit_option"></radio>-->
                        <x-input style="margin-left: 15px;font-size: 18px;" type="text" label-width="3em" title="昵称" v-model="game_nickname"></x-input>
                        <x-input style="margin-left: 15px;font-size: 18px;" type="text" label-width="3em" title="时限" placeholder="请输入分钟" v-model="game_nickname"></x-input>
                        <!--<x-input style="margin-left: 15px;font-size: 18px;" type="text" label-width="3em" title="激活卡" v-model="game_nickname"></x-input>-->
                    <span style="margin-left: 15px;padding-top: 15px;display: inline-block;">激活卡：<span style="color: orangered; font-weight: bold">免费</span></span>
                    <div style="padding:0 15px;">
                        <x-button style="margin-top: 15px;" type="primary" @click.native="apply">支付并报名</x-button>
                    </div>
                </div>
            </popup>
            <toast v-model="show8" type="success" :text="toast_msg"></toast>
        </div>
    </div>
</template>

<script>
    import {Toast, Tabbar, TabbarItem, Radio, Group, GroupTitle, Popup, XButton, Swiper, SwiperItem, XInput} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                data: {},
                show_apply: false,
                apply_game: false,
                game_nickname: '',
                deposit_option: '支付宝',
                money: 0,
                show8: false,
                toast_msg: '',
                room_id: '',
                options: ['支付宝'],
                share_url: location.href + '/?room_id=' + this.$route.params.room_id + '&invite_code=' + this.$store.state.user.invite_code

            }
        },
        mounted() {
            this.$store.state.show_menu = true
            this.room_id = this.$route.params.room_id;
            let token = this.getCookie('token')
            this.axios.get(this.$store.state.base_url + 'game/room/?room_id=' + this.room_id + '&token=' + token).then((response) => {
                    this.data = response.data
                }
            )
        },
        methods: {
            onCopy: function (e) {
                this.toast_msg = '已粘贴至剪切板'
                this.show8 = true
            },
            apply() {
                let data = new FormData()
                data.append('room_id', this.room_id)
                data.append('user_id', this.$store.state.user.id)
                this.axios.post(this.$store.state.base_url + 'game/room_apply/alipay/', data).then((response) => {
                        let res = response.data;
                        if (res.code !== 1) {
                            this.set_error_msg(res.msg)
                        } else {
                            this.toast_msg = '报名成功请查看站内信'
                            this.show8 = true
                            this.show_apply = false
                            this.data.has_apply = true
                        }
                        // window.location.href = 'https://openapi.alipay.com/gateway.do?' + res.signed_string
                    }
                )
                // if (this.deposit_option === '账户余额') {
                //
                // } else {
                //     let data = new FormData()
                //     data.append('room_id', this.room_id)
                //     data.append('user_id', this.$store.state.user.id)
                //     this.axios.post(this.$store.state.base_url + 'game/room_apply/alipay/', data).then((response) => {
                //             let res = response.data.data
                //             window.location.href = 'https://openapi.alipay.com/gateway.do?' + res.signed_string
                //         }
                //     )
                // }
            }
        },
        components: {
            Tabbar, TabbarItem, Radio, Group, Popup, XButton, Swiper, SwiperItem, GroupTitle, Toast, XInput
        }

    }
</script>


