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

    .vux-header {
        display: none !important;
    }

    .hot .item {
        margin: 10px;
        height: 110px;
    }

    .hot .item p {
        font-size: 24px;
        line-height: 24px;
        margin: 0;
        text-align: center;
        padding-top: 25px;
        color: #fff;
    }
    .hot .item p span{
        font-size: 16px;
        color: #fff;

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
                <grid-item :label="item.name" @click.native="go_rooms(item.id)" :key="item.id" v-for="item in game_list">
                    <img slot="icon" :src="item.pic">
                </grid-item>
            </grid>
        </group>
        <group class="hot" style="border-top: 10px solid #ececec">
            <group-title color="#333">热门房间</group-title>

            <!--<div class="item" @click="go_room(room.id)" v-for="room in rooms" style="background-image: url('https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=885825446,1632882213&fm=202&mola=new&crop=v1')" >-->
            <div class="item" @click="go_room(room.id)" v-for="room in rooms" :style="{backgroundImage: 'url(' + room.pic + ')'}" >
                <p>{{room.name}}</p>
                <p>
                    <span class="m-time">房间号：{{room.id}} </span>
                    <span class="m-time">人数：{{room.current_count}}/{{room.max_count}} </span>
                    <span class="m-time">报名卡：{{room.apply_money}}张</span>
                </p>
            </div>
        </group>
    </div>
</template>

<script>
    import {Grid, GridItem, Swiper, SwiperItem, Group, GroupTitle, Masker,cookie} from 'vux'

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
            this.axios.get(this.$store.state.base_url + 'game/games/').then((response) => {
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


