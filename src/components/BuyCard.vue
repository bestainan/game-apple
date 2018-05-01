<style scoped>
    .BuyCard-box {
        padding: 15px;
    }

    .vux-checker-box {
        text-align: center;
    }

    .count-item {
        width: 100px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
    }

    .count-item-selected {
        background: #ffffff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZDOEJBQ0E3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZDOEJBQ0I3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNkM4QkFDODc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNkM4QkFDOTc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnMGp3kAAAAJUExURf9KAP///////4Jqdw0AAAADdFJOU///ANfKDUEAAAAuSURBVHjaTMpBDgAABAPB5f+PlhLUpZMWuQcYMWLEyDN4ymqa5KS4+3G+KAEGACQmAGlKzr56AAAAAElFTkSuQmCC) no-repeat right bottom;
        border-color: #ff4a00;
    }

    .weui-tabbar {
        background: #ffc107;
    }

    #app > div.BuyCard-box > div:nth-child(4) > div > a > p > span {
        color: #fff;
        font-weight: 900;
        font-size: 18px;
    }

    .total {
        margin-top: 20%;
        font-size: 30px;
        color: #4d4136;
        font-weight: 900;
        text-align: center;
    }

    .total span {
        font-size: 16px;
        font-weight: 400;
        color: currentColor;
    }
</style>
<template>
    <div class="BuyCard-box">
        <p>当前激活卡数量：{{$store.state.user.card}} 张</p>
        <divider>请选择个数</divider>
        <checker
            v-model="card_type"
            default-item-class="count-item"
            selected-item-class="count-item-selected"
        >
            <checker-item :key="1" :value=1>激活卡 × 1</checker-item>
            <checker-item :key="2" :value=2>激活卡 × 2</checker-item>
            <checker-item :key="5" :value=5>激活卡 × 5</checker-item>
        </checker>
        <div>
            <!--<p class="total">￥{{card_type*20}}元 <span>20/个</span></p>-->
            <p class="total">活动期间免费</p>
        </div>
        <div>
            <tabbar  @click.native="buy">
                <tabbar-item>
                    <span slot="label">免费购买</span>
                </tabbar-item>
            </tabbar>
        </div>
        <toast v-model="show_success" type="success" :text="toast_msg"></toast>
    </div>
</template>

<script>
    import {Tabbar, TabbarItem, Checker, CheckerItem, Divider, Group, Cell, Popup, TransferDom, Toast} from 'vux'

    export default {
        name: 'Mail',
        directives: {
            TransferDom
        },
        data() {
            return {
                card_type: 1,
                toast_msg: '购买成功',
                show_success: false
            }
        },
        mounted() {
            this.$store.state.show_menu = false
        },
        methods: {
            buy() {
                let data = new FormData()
                data.append('card_type', this.card_type)
                this.axios.post(this.$store.state.base_url + 'user/card/', data).then((response) => {
                    if (response.data.code === 1) {
                            this.show_success = true
                            this.$store.state.user.card += this.card_type
                        }
                    }
                )
            },
            onItemClick(value, disabled) {
                if (!this.disabled) {
                    this.showPopup = false
                }
            }
        },
        components: {
            Checker, CheckerItem, Divider, Group, Cell, Popup, TransferDom, Tabbar, TabbarItem,Toast
        }
    }
</script>


