<template>
    <div id="head_menu">
        <el-menu class="el-menu-demo head_menu" mode="horizontal" @select="handleSelect">
            <li class="el-menu-item"><a href="/logout">退出</a></li>

            <el-menu-item index="/user_info" :route="{path: '/user_info'}">
                <router-link to="/user_info" tag="span">个人中心</router-link>
            </el-menu-item>
            <el-menu-item index="10" @click="collapse()" class="collapse_btn">
                <i class="el-icon-menu"></i>
            </el-menu-item>
        </el-menu>
        <div class="menu_collapse" :class="{'collapsed':isCollapse}">
            <el-menu
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose" style="background-color: #fbfbfb;">
                <el-submenu index="/">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>土产风物</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">风物管理</template>
                        <router-link to="/" tag="li">
                            <el-menu-item index="/" :route="{path: '/'}"><i class="el-icon-goods"></i> 所有风物
                            </el-menu-item>
                        </router-link>
                        <router-link tag="li" to="/store_add">
                            <el-menu-item index="/store_add" :route="{path: '/store_add'}"><i class="el-icon-plus"></i>
                                添加风物
                            </el-menu-item>
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
                            <el-menu-item index="2-1"><i class="el-icon-goods"></i> 所有小店</el-menu-item>
                        </router-link>
                        <router-link to="/shop_add" tag="li">
                            <el-menu-item index="2-2"><i class="el-icon-plus"></i> 添加小店</el-menu-item>
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
                        <router-link to="party_list" tag="li">
                            <el-menu-item index="3-1"><i class="el-icon-star-on"></i> 我的玩法</el-menu-item>
                        </router-link>
                        <router-link to="/party_add" tag="li">
                            <el-menu-item index="3-2"><i class="el-icon-document"></i> 发布玩法</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <router-link to="/store_orders" tag="li">
                    <el-menu-item index="4">
                        <i class="el-icon-document"></i>
                        <span slot="title">风物订单</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/store_settle" tag="li">
                    <el-menu-item index="5">
                        <i class="el-icon-document"></i>
                        <span slot="title">风物结算</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/party_orders" tag="li">
                    <el-menu-item index="6">
                        <i class="el-icon-document"></i>
                        <span slot="title">玩法订单</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/party_settle" tag="li">
                    <el-menu-item index="7">
                        <i class="el-icon-document"></i>
                        <span slot="title">玩法结算</span>
                    </el-menu-item>
                </router-link>

            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'head_menu',
        data() {
            return {
                isCollapse: false
            }
        },
        methods: {
            collapse() {
                this.isCollapse = !this.isCollapse;
            }
        }
    }
</script>

<style lang="css">
    .head_menu {
        float: right;
    }

    .el-header {
        box-shadow: 0px 1px 10px 0px rgba(50, 50, 50, 0.2);
    }
    #head_menu ul li {
        padding: 0 10px;
    }
    #head_menu ul li a{
        text-decoration: none;
    }

    .menu_collapse {
        position: absolute;
        top: 61px;
        left: 0;
        display: none;
        z-index: 99999;
        width: 100%;
    }

    .collapsed {
        display: block !important;
    }

    @media only screen and (min-width: 767px) {
        .menu_collapse {
            display: none !important;
        }

        .collapse_btn {
            display: none !important;
        }
    }
</style>
