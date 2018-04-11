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
                <transition name="component-fade" mode="out-in">
                    <router-view></router-view>
                </transition>
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
        beforeCreate: function () {
            const _this = this;
            if (!_this.USER_INFO) {
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/user/info',
                    method: 'get',
                    dataType: 'json'
                }).then((_)=> {
                    _this.USER_INFO = _.data.data.user;
                    if (_this.USER_INFO.initStatus !=='SUCCESS'){
                        _this.$notify({
                            title: '完善信息',
                            message: '个人信息不完整，请先完善个人信息！',
                            type: 'warning',
                            duration: 0
                        });
                        _this.$router.push({path: '/user_info'});
                    }
                }).catch((_) =>{
                    console.log("信息获取失败...")
                })
            }
        },
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
    .main_view {
        position: relative;
    }
    .el-main {
        padding: 15px !important;
    }
    @media (max-width: 576px) {
        .el-header{
             padding: 0;
         }
        /*.card_col:nth-of-type(odd) {*/
            /*padding-right: 5px !important;*/
        /*}*/
        /*.card_col:nth-of-type(even){*/
            /*padding-left: 5px !important;*/
        /*}*/
        .el-form-item__content > .el-col-16{
            width: 100%;
        }
        .el-form-item__content > .el-col-8 {
            width: 100%;
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
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active for below version 2.1.8 */ {
        opacity: 0;
    }
</style>
