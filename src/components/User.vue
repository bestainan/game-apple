<style>
    html {
        background-color: #fcf9fe;
    }

    .weui-cell {
        height: 30px;
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

</style>
<template>
    <div class="user-box">
        <group>
            <cell title="昵称" :value="'robot'"></cell>
            <cell is-link @click.native="show_money_type=true" :title="'余额'" :value="'100'"></cell>
        </group>
        <group>
            <cell is-link @click.native="go_path('Mail')">
                <span slot="title" ><span style="vertical-align:middle;">消息</span> <badge text="1"></badge></span>
            </cell>
            <cell is-link @click.native="go_path('History')">
                <span slot="title"><span>历史参与</span></span>
            </cell>

        </group>
        <group>
            <cell is-link @click.native="go_path('Invite')">
                <span slot="title"  style="color:red;"><span>邀请赚钱</span></span>
            </cell>

        </group>
        <div v-transfer-dom>
            <popup v-model="show_money_type" height="140px" is-transparent>
                <div style="background-color:#fff;height:250px;">
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="deposit=true">充值</x-button>
                        <x-button @click.native="get_money=true">提现</x-button>
                    </div>
                </div>
            </popup>
            <popup class="get-money" v-model="get_money" height="210px" is-transparent>
                <div style="background-color:#fff;height:250px;">
                    <span style="margin-left: 15px;padding-top: 15px;display: inline-block;">提现金额</span>
                    <div style="padding:0 15px;">
                        <x-input style="border-bottom: 1px solid #ececec;" type="number" title="￥" v-model="get_money"></x-input>
                        <span style="color: crimson;line-height: 4;">输入金额超过余额</span>
                        <x-button type="primary" @click.native>确认</x-button>
                    </div>
                </div>
            </popup>
            <popup class="get-money" v-model="deposit" height="240px" is-transparent>
                <div style="background-color:#fff;height:250px;">
                    <group>
                        <radio title="title" :options="options" v-model="deposit_option"></radio>
                    </group>
                    <span style="margin-left: 15px;padding-top: 15px;display: inline-block;">充值金额</span>

                    <div style="padding:0 15px;">
                        <x-input style="border-bottom: 1px solid #ececec;" type="number" title="￥" v-model="deposit_money"></x-input>
                        <x-button style="margin-top: 15px;" type="primary" @click.native>确认</x-button>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
    import {Cell, Group, Badge, Popup, TransferDom, XSwitch, XButton, XInput, Radio} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                show_money_type: false,
                deposit: false,
                deposit_option: '支付宝',
                value: '',
                get_money: false,
                options: ['支付宝'],
                type: '1',
            }
        },
        created: function (event) {
            this.$store.state.show_menu = true

        },
        methods: {
            go_path(name){
                this.$router.push({
                    name: name,
                })
            }
        },
        components: {
            Cell, Group, Badge, Popup, XSwitch, TransferDom, XInput, XButton, Radio
        }
    }
</script>


