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

    .weui-grid {
        padding: 0 !important;

    }

    .weui-grids {
        padding-top: 15px;
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

    .weui-cells.vux-no-group-title {
        margin-bottom: 50px;
    }

    .hot {
        margin-top: -30px;
    }
</style>
<template>
    <div class="home-box">
        <div>
            <swiper :list="banner_list" :auto="true" :loop="true"></swiper>
        </div>
        <group>
            <group-title color="#333">游戏分类</group-title>
            <grid :cols="4">
                <grid-item :label="item.name" @click.native="go_rooms(item.id)" v-for="item in game_list" :key="item.id">
                    <img slot="icon"
                         src="/static/img/wangzherongyao.jpg">
                </grid-item>
            </grid>
        </group>
        <group class="hot">
            <group-title color="#333">热门房间</group-title>
            <div style="margin: 10px;overflow: hidden;" @click="go_room(room.id)" v-for="room in rooms">
                <masker style="border-radius: 2px;" color="F9C90C" :opacity="0.8">
                    <div class="m-img" :style="'background-image:url('+ room.pic +')'"></div>
                    <div slot="content" class="m-title">
                        <h3>{{room.name}}</h3>
                        <br/>
                        <span class="m-time">房间号：{{room.id}} </span>
                        <span class="m-time">人数：{{room.current_count}}/{{room.max_count}} </span>
                        <span class="m-time">报名费：{{room.apply_money}} </span>
                        <span class="m-time">状态：进行中 </span>

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
                    this.banner_list = response.data.data
                }
            )
            this.axios.get(this.$store.state.base_url + 'game/games/?hot=1').then((response) => {
                    this.game_list = response.data.data
                }
            )
            this.axios.get(this.$store.state.base_url + 'game/rooms/?hot=1').then((response) => {
                    this.rooms = response.data.data
                }
            )
        },
        methods: {
            go_rooms(game_id){
                this.$router.push({
                    name: 'Rooms',
                    params: {game_id: game_id}
                })
            },
            go_room(room_id){
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


