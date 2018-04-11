<template>
    <div id="leftMenu">
        <el-row>
            <el-col>
                <h3 class="text-center">客栈帮商户后台</h3>
                <el-menu
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                    <el-submenu index="/">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>土产风物</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">风物管理</template>
                            <router-link to="/" tag="li">
                                <el-menu-item index="/" :route="{path: '/'}"><i class="el-icon-goods"></i> 所有风物</el-menu-item>
                            </router-link>
                            <router-link tag="li" to="/store_add">
                                <el-menu-item index="/store_add" :route="{path: '/store_add'}"><i class="el-icon-plus"></i> 添加风物</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>隐市小店</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">小店管理</template>
                            <router-link to="/shop_list" tag="li">
                                <el-menu-item index="/shop_list"><i class="el-icon-goods"></i> 所有小店</el-menu-item>
                            </router-link>
                            <router-link to="/shop_add" tag="li">
                                <el-menu-item index="/shop_add"><i class="el-icon-plus"></i> 添加小店</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-bell"></i>
                            <span>有趣玩法</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">玩法管理</template>
                            <router-link to="/party_list" tag="li">
                                <el-menu-item index="/party_list"><i class="el-icon-star-on"></i> 我的玩法</el-menu-item>
                            </router-link>
                            <router-link to="/party_add" tag="li">
                                <el-menu-item index="/party_add"><i class="el-icon-document"></i> 发布玩法</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <router-link to="/store_orders" tag="li">
                        <el-menu-item index="/store_orders">
                            <i class="el-icon-document"></i>
                            <span slot="title">风物订单</span>
                        </el-menu-item>
                    </router-link>
                    <!--<router-link to="/store_settle" tag="li">-->
                        <!--<el-menu-item index="/store_settle">-->
                            <!--<i class="el-icon-document"></i>-->
                            <!--<span slot="title">风物结算</span>-->
                        <!--</el-menu-item>-->
                    <!--</router-link>-->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-bell"></i>
                            <span>风物结算</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">风物结算</template>
                            <router-link to="/store_settle/SETTLED" tag="li">
                                <el-menu-item index="/store_settle/SETTLED"><i class="el-icon-star-on"></i> 已结算</el-menu-item>
                            </router-link>
                            <router-link to="/store_settle/READY" tag="li">
                                <el-menu-item index="/store_settle/READY"><i class="el-icon-document"></i> 未结算</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <!--<router-link to="/party_orders" tag="li">-->
                        <!--<el-menu-item index="/party_orders">-->
                            <!--<i class="el-icon-document"></i>-->
                            <!--<span slot="title">玩法订单</span>-->
                        <!--</el-menu-item>-->
                    <!--</router-link>-->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-bell"></i>
                            <span>玩法结算</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">玩法结算</template>
                            <router-link to="/party_settle/settled" tag="li">
                                <el-menu-item index="/party_settle/settled"><i class="el-icon-star-on"></i> 已结算</el-menu-item>
                            </router-link>
                            <router-link to="/party_settle/unsettle" tag="li">
                                <el-menu-item index="/party_settle/unsettle"><i class="el-icon-document"></i> 未结算</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/menu.css';
    import 'element-ui/lib/theme-chalk/menu-item.css';
    import 'element-ui/lib/theme-chalk/menu-item-group.css';
    import 'element-ui/lib/theme-chalk/icon.css';
    export default {
        name: 'leftMenu',
        data() {
            return{
            }
        },
        methods: {
        }
    }
</script>
<style lang="css">
    .text-center{
        text-align: center;
    }
</style>