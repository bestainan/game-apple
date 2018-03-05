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

    .card-padding {
        padding: 0 15px;
    }
</style>
<template>
    <div class="invite-box">
        <group title="邀请一位玩家成功报名游戏房间,即可获得3%奖励,<br/> 邀请的玩家再次邀请其他玩家获得1%" label-width="5em"></group>
        <group :title="'您的邀请码：'+this.$store.state.user.invite_code" label-width="5em"></group>
        <group label-width="5em">
            <x-table :cell-bordered="false" style="background-color:#fff;">
                <thead>
                <tr>
                    <th>昵称</th>
                    <th>邀请人数</th>
                    <th>报名金额</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in users">
                    <td>{{item.name}}</td>
                    <td>{{item.count}}</td>
                    <td>￥{{item.apply_money}}</td>
                </tr>
                </tbody>
            </x-table>
        </group>

    </div>
</template>

<script>
    import {Group, XTable, LoadMore} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                users: [],
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
            this.axios.get(this.$store.state.base_url + 'user/invite/').then((response) => {
                    this.users = response.data.data
                }
            )
        },
        methods: {},
        components: {
            Group, XTable, LoadMore
        }
    }
</script>


