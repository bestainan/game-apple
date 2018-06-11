import VueRouter from 'vue-router'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: resolve => require(['../components/Home.vue'], resolve),
            meta: {
                title: '首页',
                require_login: true,
            },
        },
        {
            path: '/hot/rooms/',
            name: 'HotRomms',
            component: resolve => require(['../components/HotRoom.vue'], resolve),
            meta: {
                title: '热门房间',
                show_header: true,
                require_login: true,
            },
        },
        {
            path: '/enchashment/',
            name: 'Enchashment',
            component: resolve => require(['../components/Enchashment.vue'], resolve),
            meta: {
                title: '提现',
                show_header: true,
                require_login: true,
            },
        },

        {
            path: '/create/room/',
            name: 'CreateRoom',
            component: resolve => require(['../components/CreateRoom.vue'], resolve),
            meta: {
                title: '创建房间',
                show_header: true,

                require_login: true,
            },
        },
        {
            path: '/rooms/:game_id',
            name: 'Rooms',
            component: resolve => require(['../components/Rooms.vue'], resolve),
            meta: {
                title: '游戏信息',
                show_header: true,

                require_login: true,
            },
        },
        {
            path: '/room/info/:room_id',
            name: 'RoomInfo',
            component: resolve => require(['../components/RoomInfo.vue'], resolve),
            meta: {
                title: '房间信息',
                show_header: true,

                require_login: true,
            },
        },
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['../components/Login.vue'], resolve),
            meta: {
                title: '登录',
                require_login: false,

            },
        },
        {
            path: '/register',
            name: 'Register',
            component: resolve => require(['../components/Register.vue'], resolve),
            meta: {
                title: '注册',
                require_login: false,

            },
        },
        {
            path: '/forget',
            name: 'ForgetPassword',
            component: resolve => require(['../components/ForgetPassword.vue'], resolve),
            meta: {
                title: '注册',
                require_login: false,

            },
        },
        {
            path: '/user',
            name: 'User',
            component: resolve => require(['../components/User.vue'], resolve),
            meta: {
                title: '个人中心',
                require_login: true,

            },
        },
        {
            path: '/mail',
            name: 'Mail',
            component: resolve => require(['../components/Mail.vue'], resolve),
            meta: {
                title: '消息',
                show_header: true,

                require_login: true,

            },
        },
        {
            path: '/rank',
            name: 'Rank',
            component: resolve => require(['../components/Rank.vue'], resolve),
            meta: {
                title: '排行',
                show_header: true,

                require_login: true,

            },
        },
        {
            path: '/invite',
            name: 'Invite',
            component: resolve => require(['../components/Invite.vue'], resolve),
            meta: {
                title: '我的邀请码',
                require_login: true,

            },

        },
        {
            path: '/history',
            name: 'History',
            component: resolve => require(['../components/History.vue'], resolve),
            meta: {
                title: '历史参与',
                show_header: true,

                require_login: true,
            },
        },
        {
            path: '/winner',
            name: 'IAmWinner',
            component: resolve => require(['../components/IAmWinner.vue'], resolve),
            meta: {
                title: '领取奖励',
                show_header: true,

                require_login: true,
            },
        },
        {
            path: '/buy/card',
            name: 'BuyCard',
            component: resolve => require(['../components/BuyCard.vue'], resolve),
            meta: {
                title: '购买激活卡',
                show_header: true,

                require_login: true,
            },
        },
        {
            path: '/qrcode',
            name: 'QrCode',
            component: resolve => require(['../components/QrCode.vue'], resolve),
            meta: {
                title: '我的邀请码',
                require_login: true,
            },
        },
    ]
})
