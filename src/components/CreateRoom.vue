<style>

    .create-room-box .tz-input {
        border: 1px solid #abb4c3;
        margin-bottom: 20px;
        color: #333;
    }

    .create-room-box .tz-input img {
        padding-right: 10px;
        display: block;
        width: 24px;
    }

    .group {
        border: 1px solid #abb4c3;
    }

    .form {
        padding: 30px;
    }

    .weui-cell.vux-x-textarea {
        border: 1px solid #abb4c3 !important;

    }

    .submit {
        margin-top: 20px;
        margin-bottom: 40px;
    }

    .vux-header {
        display: none;
    }

    .time-select {
        border: 1px solid #abb4c3;
        margin-bottom: 20px;
        color: #666666;
        height: 46px;

    }

    .time-select .icon {
        padding-right: 5px;
        position: relative;
        top: 4px;
        width: 24px;
        height: 24px;
    }

    .time-select .weui-label {
        position: relative;
        top: -5px;
    }

    .weui-cell:before {
        border-top: none !important;
    }

    .selected-game .weui-cell.vux-tap-active.weui-cell_access {
        height: 24px;
        border: 1px solid #abb4c3;
        margin-bottom: 20px;
        position: relative;
    }

    .vux-cell-bd.vux-cell-primary .vux-label {
        color: #666666;
        padding-left: 34px;
    }

    .selected-game {
        position: relative;
    }

    .selected-game .icon {
        position: absolute;
        top: 10px;
        left: 17px;
    }

</style>
<template>
    <div class="create-room-box">
        <div>
            <swiper :list="banner_list" :auto="true" :loop="true"></swiper>
        </div>
        <div class="form">
            <x-input class="tz-input" v-model="form.name" type="text" placeholder="房间名称">
                <img slot="label" src="../../src/assets/account.png" width="24" height="24">
            </x-input>
            <div class="selected-game">
                <img class="icon" slot="label" src="../../src/assets/password.png" width="24" height="24">
                <popup-radio title="选择游戏" :options="game_options" v-model="form.game" placeholder="选择游戏"></popup-radio>
            </div>
            <x-input class="tz-input" type="text" v-model="form.max_count" placeholder="设置参加人数">
                <img slot="label" src="../../src/assets/password.png" width="24" height="24">
            </x-input>
            <datetime-range class="time-select" title="<img class='icon' src='/static/img/password.3429b96.png'> 开始时间" start-date="2018-01-01" end-date="2018-06-02" format="YYYY年MM月DD日" v-model="form.start_time"></datetime-range>
            <datetime-range class="time-select" title="<img class='icon' src='/static/img/password.3429b96.png'> 结束时间" start-date="2018-01-01" end-date="2018-06-02" format="YYYY年MM月DD日" v-model="form.end_time"></datetime-range>
            <!--<x-input class="tz-input" type="text" v-model="form.max_count" placeholder="游戏结束时间">-->
            <!--<img slot="label" src="../../src/assets/password.png" width="24" height="24">-->
            <!--</x-input>-->
            <x-input class="tz-input" type="text" v-model="form.apply_money" placeholder="设置报名卡数量">
                <img slot="label" src="../../src/assets/password.png" width="24" height="24">
            </x-input>
            <group>
                <x-textarea :max="20" v-model="form.des" placeholder="填写游戏规则"></x-textarea>
            </group>
            <x-button class="submit" type="primary" @click.native="submit">确认创建</x-button>

        </div>
    </div>
</template>

<script>
    import {XInput, XButton, Swiper, XTextarea, Group, DatetimeRange, Popup, PopupRadio} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                show_start_time: false,
                show_end_time: false,
                banner_list: [],
                game_options: [{
                    key: '1',
                    value: '王者荣耀'
                }, {
                    key: '2',
                    value: '荒野求生'
                }],
                form: {
                    name: '',
                    game: '',
                    max_count: '',
                    start_time: [],
                    end_time: [],
                    apply_money: '',
                    des: ''
                },
            }
        },

        mounted() {
            this.$store.state.show_menu = true
            this.axios.get(this.$store.state.base_url + 'game/banners/').then((response) => {
                    this.banner_list = response.data
                }
            )
        },
        methods: {
            submit() {
                let data = new FormData()
                for (let key in this.form) {
                    data.append(key, this.form[key]);
                }
                this.axios.post(this.$store.state.base_url + 'game/room/create/', data).then((response) => {
                        if (response.code !== 1){
                            this.set_error_msg(response['msg'])
                            return false
                        }

                    this.$router.push({
                        name: 'RoomInfo',
                        params: {room_id: room_id}
                    })
                        // console.log(response)
                    }
                )

            }
        },
        components: {
            PopupRadio,
            Popup,
            DatetimeRange,
            Group,
            XInput,
            XButton,
            Swiper,
            XTextarea
        }
    }
</script>


