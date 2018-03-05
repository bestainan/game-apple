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
    <div class="rank-box">

    </div>
</template>

<script>
    import {} from 'vux'

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


