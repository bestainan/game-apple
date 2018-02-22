
export default new VueRouter({
    mode:'history',
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
    ]
})
