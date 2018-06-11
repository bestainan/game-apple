<style>
    .weui-grids {
        padding: 20px;
    }

    .tz-input {
        border: 1px solid #abb4c3;
        margin-bottom: 20px;
        color: #333;
    }

    .tz-input img {
        padding-right: 10px;
        display: block;
        width: 20px;
    }
    .desc p {
        margin: 0;

    }
    #app .vux-header {
        background-color: #fec142 !important;
    }
    #app > div.create-room-box > div.form > div.selected-game > div > div.vux-cell-bd.vux-cell-primary > p > label{
        padding-left: 34px !important;
        color: #757575 !important;
    }
</style>
<template>
    <div class="room-info-box">
        <div>
            <swiper :list="banner_list" :auto="true" :loop="true"></swiper>
        </div>
        <div style="padding: 20px;">
            <x-input class="tz-input" v-model="form.room_id" type="text" placeholder="请输入房间号码"></x-input>
            <x-input class="tz-input" v-model="form.name" type="text" placeholder="请输入游戏ID"></x-input>
        </div>
        <img :src="form.img" alt="">
        <div class="progressContainer" :style="{display: display}">
            <div class="progress" :style="{width:progress+'%'}">
                <b>{{progress}}%</b>
            </div>
        </div>

        <div class="btns" style="text-align: center;">
            <div id="picker" style="width: 200px;color: white;">选择文件</div>
        </div>

        <vue-upload-web :url="cdnUrl" :form-data="cdnParams" :accept="accept" :key-generator="keyGenerator"
                        @progress="uploadProgress" @success="handleSuccess" @before="beforeUpload"
                        @error="error" @complete="handleComplete" upload-button=".btns" :multiple=true>
        </vue-upload-web>
        <div class="desc" style="padding: 20px;">
            <p>asdasdaksdjhkaj</p>
            <p>asdasdaksdjhkaj</p>
            <p>asdasdaksdjhkaj</p>
        </div>
        <x-button @click.native="submit" class="login-button" style="width: 228px;height: 42px;font-size: 15px;background-color: #ffc107;color: #ffffff;">上传凭证</x-button>

    </div>
</template>

<script>
    import {Grid, GridItem, Toast, Tabbar, TabbarItem, Radio, Group, GroupTitle, Popup, XButton, Swiper, SwiperItem, XInput} from 'vux'

    export default {
        name: 'login',
        data() {
            return {
                banner_list: [],
                form: {
                    room_id: 0,
                    name: '',
                    img: '',

                },
                display: "none",
                progress: 0,
                imgList: [],
                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'jpg,jpeg,png',
                    mimeTypes: 'image/jpg,image/jpeg,image/png'
                },
                cdnUrl: this.$store.state.base_url + 'game/upload_img/',
                cdnParams: {
                    token: '上传如果需要的token认证',
                    key: '',
                    name: '',
                    chunk: 0,
                    chunks: 1
                },
            }
        },
        mounted() {
            this.$store.state.show_menu =  true
            this.axios.get(this.$store.state.base_url + 'game/banners/').then((response) => {
                    this.banner_list = response.data
                }
            )
        },
        methods: {
            submit() {
                if (!this.form.room_id) {
                    this.set_error_msg('房间号不能为空')
                    return false
                }
                if (!this.form.name) {
                    this.set_error_msg('游戏昵称不能为空')
                    return false
                }
                if (!this.form.img) {
                    this.set_error_msg('请上传获胜截图')
                    return false
                }
                this.$store.state.show_menu = false
                let data = new FormData()
                data.append('room_id', this.form.room_id)
                data.append('name', this.form.name)
                data.append('img', this.form.img)
                this.axios.post(this.$store.state.base_url + 'game/winner/', data)
                .then((response) => {
                    console.log(response)
                    this.form.img =
                        this.set_error_msg('已提交等待审核')
                    }
                ).catch(function (error) {
                    console.log(error);
                })
            },
            handleSuccess(file, res) {
                this.form.img = res.url
                const imageUrl = res.url
                this.imgList.push({
                    imageUrl: imageUrl,
                    name: file.name,
                    file: file
                });
                console.log(this.imgList)
            },
            beforeUpload(file) {

            },
            uploadProgress(file, percentage) {
                this.display = "block";
                this.progress = percentage * 100;
            },
            error(message) {
                this.$message.error(message);
            },
            handleComplete(res) {
                this.display = "none";
            },
            keyGenerator(file) {
                const currentTime = new Date().getTime();
                this.cdnParams.key = "test/cdn/ie9/" + currentTime + "." + file.name;
                return this.cdnParams.key;
            },
            mouseenter(event) {
                event.currentTarget.getElementsByClassName("gouxuan")[0].style.display = "none";
                event.currentTarget.getElementsByClassName("chahao")[0].style.display = "inline-block";
            },
            mouseleave(event) {
                event.currentTarget.getElementsByClassName("gouxuan")[0].style.display = "inline-block";
                event.currentTarget.getElementsByClassName("chahao")[0].style.display = "none";
            },
            deleteImg(event) {
                const imageUrl = event.currentTarget.getAttribute("img-url");
                this.imgList = this.imgList.filter(img => img.imageUrl != imageUrl);
            },
            nameClick(file) {
            }
        },
        components: {
            Grid, GridItem, Tabbar, TabbarItem, Radio, Group, Popup, XButton, Swiper, SwiperItem, GroupTitle, Toast, XInput
        }

    }
</script>


