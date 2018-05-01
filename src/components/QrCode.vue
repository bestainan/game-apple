<style>
    .qr-code {
        width: 100%;

    }

    #qrcode {
        position: absolute;
        bottom: 10%;
        left: 0;
        right: 0;
    }
    #qrcode img{
        margin: 0 auto;
        border: 12px #fff solid;

    }
</style>
<template>
    <div class="qr-code">
        <div style="position: relative">
            <img class="qr-code" src="/static/img/WechatIMG115.jpeg" alt="">
            <div id="qrcode"></div>
        </div>
        <p style="text-align: center">长按图片 保存并分享给您的朋友</p>

    </div>
</template>

<script>

    import QRCode from 'qrcodejs2'

    export default {
        name: 'qr_code',
        data() {
            return {}
        },
        created: function (event) {
            this.$store.state.show_menu = true
        },
        mounted() {
            this.qrcode()
        },
        methods: {
            qrcode() {
                let qrcode = new QRCode('qrcode', {
                    width: 120,
                    height: 120,
                    text: 'http://wz.jiuxingjinfu.cn/register/' + '?invite_code='+this.$store.state.user.invite_code // 二维码内容
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                })
                console.log(qrcode)
            }
        },
        components: {
            QRCode
        }
    }
</script>


