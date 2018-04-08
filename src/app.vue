<template>
    <el-container id="main_context" class="main_container">
        <el-aside class="hidden-xs-only">
            <Left-menu></Left-menu>
        </el-aside>
        <el-container id="main_container">
            <el-header>
                <header-tab></header-tab>
            </el-header>
            <el-main class="main_mt_15 main_view">
                <router-view></router-view>
            </el-main>
            <!--<el-footer>©2013-2017 客栈帮 蜀ICP备13025558号-1</el-footer>-->
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
    import 'element-ui/lib/theme-chalk/loading.css';
    import 'element-ui/lib/theme-chalk/input.css';
    import 'element-ui/lib/theme-chalk/col.css';
    import 'element-ui/lib/theme-chalk/form-item.css';
    import 'element-ui/lib/theme-chalk/form.css';
    import 'element-ui/lib/theme-chalk/checkbox-group.css';
    import 'element-ui/lib/theme-chalk/checkbox-button.css';
    import 'element-ui/lib/theme-chalk/time-picker.css';
    import 'element-ui/lib/theme-chalk/time-select.css';
    import 'element-ui/lib/theme-chalk/switch.css';
    import 'element-ui/lib/theme-chalk/slider.css';
    import 'element-ui/lib/theme-chalk/icon.css';
    import 'element-ui/lib/theme-chalk/button.css';
    import 'element-ui/lib/theme-chalk/radio.css';
    import 'element-ui/lib/theme-chalk/transfer.css';
    import 'element-ui/lib/theme-chalk/radio-group.css';
    import 'element-ui/lib/theme-chalk/radio-button.css';
    import 'element-ui/lib/theme-chalk/select-dropdown.css';
    import 'element-ui/lib/theme-chalk/select.css';
    import 'element-ui/lib/theme-chalk/date-picker.css';

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
    .main_view {
        position: relative;
    }
    @media (max-width: 576px) {
        .el-main {
            padding: 0;
        }
        .el-header{
            padding: 0;
        }
        .card_col:nth-of-type(odd) {
            padding-right: 5px !important;
        }
        .card_col:nth-of-type(even){
            padding-left: 5px !important;
        }
    }
    ul {
        list-style: none;
    }
    .el-footer {
        /*height: 20px !important;*/
        /*color: #ccc;*/
        /*font-size: 12px;*/
        padding: 15px;
    }
    .el-aside {
        border-right: solid 1px #e6e6e6;
    }
    .el-menu {
        border-right: none;
    }
</style>
