import Vue from 'vue';
import Router from 'vue-router';
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
import partyDetail from './views/party_detail.vue';
import storeSettle from './views/store_settle.vue';
import userInfo from './views/user_info.vue';
import storeDetail from './views/store_detail.vue';
import displayDetail from './views/display_detail.vue';

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active', // 将激活的路由添加一个active类名称
    routes: [
        {
            path: '/',
            component: stores
        },
        {
            path: '/store/:id',
            component: storeDetail
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
            path: '/shop/:id',
            component: displayDetail
        },
        {
            path: '/shop_add',
            component: displayAdd
        },
        {
            path: '/party_list',
            component: partyList
        },
        {
            path: '/party/:id',
            component: partyDetail
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
            path: '/store_settle/:status',
            component: storeSettle
        },
        {
            path: '/party_orders/:id',
            component: partyOrders
        },
        {
            path: '/party_settle/:status',
            component: partySettle
        },
        {
            path: '/user_info',
            component: userInfo
        }
    ]
})
