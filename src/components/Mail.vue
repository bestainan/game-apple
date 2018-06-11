<style>
    #app .vux-header {
        background-color: #fec142 !important;
    }

    p {
        margin: 0;
    }

    .Mail-box {
        padding: 15px;
        background: #eee;
    }
    .item{
        padding: 15px;
        background: #fff;
        border-radius: 3px;
        margin-bottom: 15px;
    }
    .title{
        font-size: 16px;
    }

    .content{
        font-size: 14px;
        color: #999;
    }
    html{
        background: #eee !important;
    }
    .time{
        font-size: 12px;
        margin-top: 10px;
        color: #999;

    }
    #app .vux-header {
        background-color: #fec142 !important;
        display: block !important;
    }
</style>
<template>
    <div class="Mail-box">
        <div style=" margin-bottom:50px;">
            <div class="item" v-for="item in list">
                <p class="title">{{item.title}}</p>
                <p class="content">{{item.desc}}</p>
                <!--<p class="time">{{item.meta.date}}</p>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {ButtonTab, ButtonTabItem, Group, Radio} from 'vux'

    export default {
        name: 'Mail',
        data() {
            return {
                selectd: 'all',
                type: '4',
                list: [
//                     {
//                         title: '标题一',
//                         desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
// //                        url: {
// //                            name: 'MailInfo',
// //                            params: {id: 123}
// //
// //                        },
//                     },
//                     {
//                         title: '标题二',
//                         desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
//                        meta: {
//                            date: '2017-01-01',
//                        }
//                     },

                ],
            }
        },
        mounted() {
            this.$store.state.show_menu = true
            this.axios.get(this.$store.state.base_url + 'user/mail/').then((response) => {
                    this.list = response.data
                }
            )
        },
        methods: {
            onImgError(item, $event) {
                console.log(item, $event)
            }
        },
        components: {
            ButtonTab, ButtonTabItem, Group, Radio
        }
    }
</script>


