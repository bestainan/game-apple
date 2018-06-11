<style>
    #app .vux-header {
        background-color: #fec142 !important;
    }

    html {
        background: #f0f0f0;
    }

    p {
        margin: 0;
        padding: 0 15px;
        line-height: 2;
    }

    .history-box {
        padding: 20px;
    }

    .left {
        padding: 15px;
        float: left;
    }

    .right {
        float: left;
        padding-top: 15px;
        width: 55%;
    }

    img {
        width: 120px;
    }

    .top {
        border-bottom: 1px solid rgba(0, 0, 0, .15);
    }

    .box {
        background: #fff;
        border-radius: 5px;
    }

    .right p {
        padding: 0;
        line-height: 1.5;
    }

    .right p .item {
        font-size: 13px;
        color: #999;
        width: 80px;
        display: inline-block;
    }
    .right p .item .title{
        width: 60px;
        display: inline-block;
    }
    .status{
        text-align: right;
        display: inline-block;
        width: 50%;
        font-size: 13px;
        color: #999;
    }
     .box{
         margin-bottom: 10px;
     }
</style>
<template>
    <div class="history-box" style="background: #f0f0f0;">
        <div class="box" v-for="item in datas" @click.native="go_room(item.room_id)">
            <p class='top'>报名时间：{{item.create_time}}</p>
            <div class="content">
                <div class="left">
                    <img src="/static/img/history-wangzhe.jpg" alt="">
                </div>
                <div class="right">
                    <p>
                        <span style="font-size: 18px;color: #333;">{{item.game_name}}</span>
                        <span  class="status">{{item.status}}</span>
                    </p>
                    <p style="padding-top: 5px;">

                        <span class="item"><span class="title">人数：</span>{{item.max_count}}</span>
                    </p>
                    <p>
                        <span class="item"><span class="title">房间号：</span>{{item.room_id}}</span>
                        <span class="item"><span class="title">报名卡：</span>{{item.apply_money}}</span>
                    </p>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {FormPreview} from 'vux'

    export default {
        name: 'history',
        data() {
            return {
                list: [],
                datas: [],
                go_info: [{
                    style: 'primary',
                    text: '详情',
                    onButtonClick: (room_id) => {
                        console.log(room_id)
                        this.$router.push({
                            name: 'RoomInfo',
                            params: {room_id: room_id}
                        })
                    }
                }]

            }
        },
        mounted() {
            this.$store.state.show_menu = true
            this.axios.get(this.$store.state.base_url + 'game/apply/history/').then((response) => {
                    this.datas = response.data
                    console.log(this.datas);
                }
            )
        },
        methods: {
            go_room(room_id) {
                this.$router.push({
                    name: 'RoomInfo',
                    params: {room_id: room_id}
                })
            }
        },
        components: {
            FormPreview
        }
    }
</script>


