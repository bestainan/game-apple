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
        font-size: 16px ;
        color: white !important;
    }


    .m-title h3 {
        font-size: 28px;
        color: white;
    }

    .m-title span {
        color: #333;
        font-size: 18px;
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

    .game-box {

    }

    .weui-cell__bd p {
        margin: 0;
    }

    #title .weui-cell {
        height: 30px;
    }

    .weui-grid {
        padding: 0 !important;

    }

    .weui-grids:before, .weui-cells:before, .weui-cells:after, .weui-grids:after {
        border: none !important;
    }

    .weui-grid:before, .weui-cells:before {
        border: none !important;
    }

    .weui-grid:after {
        border-bottom: none !important;
    }


    .weui-cells__title {
        font-size: 20px !important;
        color: #666 !important;
    }

    .weui-grid__label {
        color: #999 !important;
    }

    .weui-grid__icon {
        width: 60px !important;
        height: 100% !important;
        margin: 0 auto;
    }

    .weui-cells, .weui-cells, .vux-no-group-title {
        margin-top: 0 !important;
    }
    .vux-header{
        display: none !important;
    }
</style>
<template>
    <div class="home-box">
        <div>
            <swiper :list="banner_list" :auto="true" :loop="true"></swiper>
        </div>
        <group style="border-top: 10px solid #ececec;background: #d9dfe224">
            <group-title color="#333">游戏分类</group-title>
            <grid class="game-box" :cols="4" style="padding: 15px;">
                <!--<grid-item :label="item.name" @click.native="go_rooms(item.id)" v-for="item in game_list" :key="item.id">-->
                <!--<img slot="icon" src="/static/img/wangzherongyao.jpg">-->
                <!--</grid-item>-->
                <grid-item label="王者荣耀" :key="1">
                    <img slot="icon" src="/static/img/wangzherongyao.png">
                </grid-item>
                <grid-item label="王者荣耀" :key="1">
                    <img slot="icon" src="/static/img/wangzherongyao.png">
                </grid-item>
                <grid-item label="王者荣耀" :key="1">
                    <img slot="icon" src="/static/img/wangzherongyao.png">
                </grid-item>
                <grid-item label="王者荣耀" :key="1">
                    <img slot="icon" src="/static/img/wangzherongyao.png">
                </grid-item>
                <grid-item label="王者荣耀" :key="1">
                    <img slot="icon" src="/static/img/wangzherongyao.png">
                </grid-item>
                <grid-item label="更多" :key="1">
                    <img slot="icon" src="/static/img/wangzherongyao.png">
                </grid-item>

            </grid>
        </group>
        <group class="hot" style="border-top: 10px solid #ececec;background: #d9dfe224">
            <group-title color="#333">热门房间</group-title>
            <div style="margin: 10px;overflow: hidden;" @click="go_room(room.id)" v-for="room in rooms">
                <masker style="border-radius: 2px;" color="#000" :opacity="0.3">
                    <div class="m-img" :style="'background-image:url('+ room.pic +')'"></div>
                    <div slot="content" class="m-title">
                        <h3>{{room.name}}</h3>
                        <br/>
                        <span class="m-time">房间号：{{room.id}} </span>
                        <span class="m-time">人数：{{room.current_count}}/{{room.max_count}} </span>
                        <span class="m-time">报名卡：{{room.apply_money}}张</span>
                    </div>
                </masker>
            </div>
        </group>
    </div>
</template>

<script>
    import {Grid, GridItem, Swiper, SwiperItem, Group, GroupTitle, Masker} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                banner_list: [],
                rooms: [],
                game_list: []
            }
        },
        mounted() {
            this.$store.state.show_menu = true
            this.axios.get(this.$store.state.base_url + 'game/banners/').then((response) => {
                    this.banner_list = response.data
                }
            )
            this.axios.get(this.$store.state.base_url + 'game/games/?hot=1').then((response) => {
                    this.game_list = response.data
                }
            )
            this.axios.get(this.$store.state.base_url + 'game/rooms/?hot=1').then((response) => {
                    this.rooms = response.data
                }
            )
        },
        methods: {
            go_rooms(game_id) {
                this.$router.push({
                    name: 'Rooms',
                    params: {game_id: game_id}
                })
            },
            go_room(room_id) {
                this.$router.push({
                    name: 'RoomInfo',
                    params: {room_id: room_id}
                })
            }
        },
        components: {
            Grid, GridItem, Swiper, SwiperItem, Group, GroupTitle, Masker
        }
    }
</script>


