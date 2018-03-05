export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: resolve => require(['../components/Home.vue'], resolve),
            meta: {
                title: '首页',
            },
        },
        {
            path: '/rooms/:game_id',
            name: 'Rooms',
            component: resolve => require(['../components/Rooms.vue'], resolve),
            meta: {
                title: '房间信息',
            },
        },
        {
            path: '/room/info/:room_id',
            name: 'RoomInfo',
            component: resolve => require(['../components/RoomInfo.vue'], resolve),
            meta: {
                title: '房间信息',
            },
        },
        {
            path: '/login/',
            name: 'Login',
            component: resolve => require(['../components/Login.vue'], resolve),
            meta: {
                title: '登录',
            },
        },
        {
            path: '/register/',
            name: 'Register',
            component: resolve => require(['../components/Register.vue'], resolve),
            meta: {
                title: '注册',
            },
        },
        {
            path: '/user/',
            name: 'User',
            component: resolve => require(['../components/User.vue'], resolve),
            meta: {
                title: '个人中心',
            },
        },
        {
            path: '/mail/',
            name: 'Mail',
            component: resolve => require(['../components/Mail.vue'], resolve),
            meta: {
                title: '消息',
            },
        },
        {
            path: '/rank/',
            name: 'Rank',
            component: resolve => require(['../components/Rank.vue'], resolve),
            meta: {
                title: '消息',
            },
        },
        {
            path: '/invite/',
            name: 'Invite',
            component: resolve => require(['../components/Invite.vue'], resolve),
            meta: {
                title: '消息',
            },
        },
        {
            path: '/history/',
            name: 'History',
            component: resolve => require(['../components/History.vue'], resolve),
            meta: {
                title: '消息',
            },
        },
    ]
})
