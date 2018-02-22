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
</style>
<template>
    <div class="home-box">
        <div>
            <swiper :list="banner_list" auto="true" loop="true"></swiper>
        </div>
        <div>
            <div style="margin: 10px;overflow: hidden;" @click="apply_game=true;money=room.apply_money;room_id=rom.id " v-for="room in rooms">
                <masker style="border-radius: 2px;" color="F9C90C" :opacity="0.8">
                    <div class="m-img" :style="'background-image:url('+ room.pic +')'"></div>
                    <div slot="content" class="m-title">
                        <h3>{{room.name}}</h3>
                        <br/>
                        <span class="m-time">房间号：{{room.id}} </span>
                        <span class="m-time">人数：{{room.current_count}}/{{room.max_count}} </span>
                        <span class="m-time">报名费：{{room.apply_money}} </span>

                    </div>
                </masker>
            </div>
            <popup class="get-money" v-model="apply_game" height="230px" is-transparent>
                <div style="background-color:#fff;height:250px;">
                    <group>
                        <radio id="title" title="title" :options="options" v-model="deposit_option"></radio>
                    </group>
                    <span style="margin-left: 15px;padding-top: 15px;display: inline-block;">支付金额：<span style="color: orangered; font-weight: bold">{{money}}</span></span>
                    <div style="padding:0 15px;">
                        <x-button style="margin-top: 15px;" type="primary" @click.native>支付并报名</x-button>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
    import {Masker, Swiper, GroupTitle, SwiperItem, XButton, Divider, Radio, Group, Popup, XInput} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                rooms: [],
                banner_list: [],
                swiperItemIndex: 1,
                apply_game: false,
                deposit_option: '账户余额',
                money: 0,
                room_id: '',
                options: ['账户余额', '支付宝'],
            }
        },
        mounted() {
            this.$store.state.show_menu = true
            this.axios.get(this.$store.state.base_url + 'game/rooms/').then((response) => {
                    this.rooms = response.data.data
                }
            )
            this.axios.get(this.$store.state.base_url + 'game/banners/').then((response) => {
                    this.banner_list = response.data.data
                }
            )
        },
        methods: {
        },
        components: {
            Masker, Swiper, GroupTitle, SwiperItem, XButton, Divider, Radio, Group, Popup, XInput
        }
    }
</script>


