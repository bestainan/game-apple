<style>
    .Mail-box {
        padding: 15px 20px;
    }

    /*.weui-media-box{*/
    /*padding-top:0 !important;*/
    /*padding-bottom:0 !important;*/
    /*}*/
</style>
<template>
    <div class="Mail-box">
        <button-tab>
            <button-tab-item selected @on-item-click="bank_type='bank'">所有</button-tab-item>
            <button-tab-item @on-item-click="bank_type='bank'">未读</button-tab-item>
        </button-tab>

        <div style="margin-top: 15px; margin-bottom:50px;">
            <panel :list="list" :type="type" @on-img-error="onImgError"></panel>
        </div>
    </div>
</template>

<script>
    import {ButtonTab, ButtonTabItem, Panel, Group, Radio} from 'vux'

    export default {
        name: 'Mail',
        data() {
            return {
                selectd: 'all',
                type: '2',
                list: [
                    {
                        title: '标题一',
                        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                        url: {
                            name: 'MailInfo',
                            params: {id: 123}

                        },
                    },
                    {
                        title: '标题二',
                        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                        url: {
                            name: 'MailInfo',
                            params: {id: 123}

                        },
                        meta: {
                            source: '来源信息',
                            date: '时间',
                            other: '其他信息'
                        }
                    },

                ],
            }
        },
        created: function (event) {
        },
        methods: {
            onImgError(item, $event) {
                console.log(item, $event)
            }
        },
        components: {
            ButtonTab, ButtonTabItem, Panel, Group, Radio
        }
    }
</script>


