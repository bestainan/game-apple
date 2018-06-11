<style>
    #app .vux-header {
        background-color: #fec142 !important;
    }

    .box {
        padding: 0 50px;
    }

    .balance {
        text-align: center;
        font-size: 30px;
        padding-right: 20px !important;
    }

    .title-box {
        border-bottom: 5px solid #eee;
    }

    .title {
        font-size: 18px;
        color: #999999;
    }

    .num {
        font-size: 50px;
        color: #fec142;
    }

    .enchashment-box .tz-input {
        border: 1px solid #abb4c3;
        margin-bottom: 20px;
        color: #333;
    }

    .enchashment-box .tz-input img {
        padding-right: 10px;
        display: block;
        width: 20px;
    }

    .payment {
        padding: 0 20px;
        border-bottom: 5px solid #eee;
    }

    .payment .logo img {
        width: 50px;
    }

    .payment .name {
        position: relative;
        font-size: 23px;
        top: -15px;
        color: #999;
    }

    .weui-icon-success {
        color: #10aeff !important;
        font-size: 30px !important;
        position: relative;
        top: 10px;
    }

    .selected {
        float: right;

    }

    .bottom {
        padding: 50px;
    }

    .bottom .submit {
        background-color: #10aeff !important
    }
</style>
<template>
    <div class="enchashment-box">
        <div class="title-box">
            <p class="balance">
                <span class="title">余额：</span>
                <span class="num">8000</span>
            </p>
            <div class="box">
                <x-input class="tz-input" type="text" placeholder="提现金额"></x-input>
            </div>
        </div>
        <p class="payment">
            <span class="logo">
                <img src="/static/img/alipay.png" alt="">
            </span>
            <span class="name">支付宝</span>
            <span class="selected"><icon type="success" is-msg></icon></span>
        </p>
        <div class="bottom">
            <x-button class="submit" type="primary">确认创建</x-button>

        </div>
    </div>
</template>

<script>
    import {XInput, Icon, XButton} from 'vux'

    export default {
        name: 'login',
        data() {
            return {}
        },
        mounted() {
            this.$store.state.show_menu = true
        },
        methods: {},
        components: {
            XInput, Icon, XButton
        }

    }
</script>


