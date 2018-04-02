import Vue from 'vue';
import Router from 'vue-router';
import homePage from './views/home.vue';
import aboutPage from './views/about.vue';
import displayList from './views/display_list.vue';
import displayAdd from './views/display_add.vue';
import storeAdd from './views/store_add.vue';
import stores from './views/stores.vue';
import partyList from  './views/party_list.vue';
import partyAdd from  './views/party_add.vue';
import storeOrder from  './views/store_order.vue';
import partyOrders from './views/party_orders.vue';
import partySettle from './views/party_settle.vue';
import storeSettle from './views/store_settle.vue';
import userInfo from './views/user_info.vue';

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
            component: storeAdd
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
        {
            path: '/party_list',
            component: partyList
        },
        {
            path: '/party_add',
            component:partyAdd
        },
        {
            path: '/store_orders',
            component: storeOrder
        },
        {
            path: '/store_settle',
            component: storeSettle
        },
        {
            path: '/party_orders',
            component: partyOrders
        },
        {
            path: '/party_settle',
            component: partySettle
        },
        {
            path: '/user_info',
            component: userInfo
        }
    ]
})
