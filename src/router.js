import Vue from 'vue';
import Router from 'vue-router';
import homePage from './views/home.vue';
import aboutPage from './views/about.vue';
import displayList from './views/display_list.vue';
import displayAdd from './views/display_add.vue';
import stores from './views/stores.vue';

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active', // 将激活的路由添加一个active类名称
    routes: [
        {
            path: '/',
            component: stores
        },
        {
            path: '/store_add',
            component: displayAdd
        },
        {
            path: '/about',
            component: aboutPage
        },
        {
            path: '/shop_list',
            component:displayList
        },
        {
            path: '/shop_add',
            component:displayAdd
        },
        // {
        //     path: '/party_list',
        //     component:
        // },
        // {
        //     path: '/party_add',
        //     component:
        // },
        // {
        //     path: '/store_orders',
        //     component:
        // },
        // {
        //     path: '/store_settle',
        //     component:
        // },
        // {
        //     path: '/party_orders',
        //     component:
        // },
        // {
        //     path: '/party_settle',
        //     component:
        // }
    ]

})
