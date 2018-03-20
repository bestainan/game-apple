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
    <div class="history-box">
        <div>
            <form-preview  v-for="item in datas" :header-label="'报名费'" :key="item.id" :header-value="'¥'+item.money" :body-items="item.value_list" :footer-buttons="go_info" :name="item.room_id"></form-preview>
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
                datas:[],
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
                }
            )
        },
        methods: {},
        components: {
            FormPreview
        }
    }
</script>


