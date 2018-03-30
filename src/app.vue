<template>
    <el-container id="main_context" class="main_container">
        <el-aside class="hidden-xs-only">
            <Left-menu></Left-menu>
        </el-aside>
        <el-container>
            <el-header>
                <header-tab></header-tab>
            </el-header>
            <el-main class="main_mt_15">
                <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
    import HeaderTab from './components/header.vue';
    import LeftMenu from './components/left_menu.vue';
    import container from './components/container.vue';
    import 'element-ui/lib/theme-chalk/container.css';
    import 'element-ui/lib/theme-chalk/aside.css';
    import 'element-ui/lib/theme-chalk/header.css';
    import 'element-ui/lib/theme-chalk/main.css';
    import 'element-ui/lib/theme-chalk/footer.css';
    import 'element-ui/lib/theme-chalk/display.css';
    import 'element-ui/lib/theme-chalk/base.css';

    export default {
        name: 'main_context',
        data() {

        },
        components: {
            HeaderTab, container, LeftMenu
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>

<style lang="css">
    .main_container{
        height: 100%;
    }
    .main_mt_15{
        margin-top: 15px;
    }
    @media (max-width: 576px) {
        .el-main {
            padding: 0;
        }
        .el-header{
            padding: 0;
        }
    }
</style>
