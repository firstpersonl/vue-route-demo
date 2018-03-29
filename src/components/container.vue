<template>
    <div id="main_context">
        <div class="container">
            <div class="page-container">
                <left-menu></left-menu>
                <!-- BEGIN CONTENT -->
                <div class="page-content-wrapper">
                    <div class="page-content">
                        <!-- BEGIN PAGE HEADER-->
                        <h3 class="page-title">
                            琴棋书画诗酒茶</h3>
                        <router-view></router-view>
                    </div>
                </div>
                <!-- END CONTENT -->
            </div>
            <!-- END CONTAINER -->
            <!-- BEGIN FOOTER -->
            <div class="page-footer">
                <div class="page-footer-inner">
                    2013-2017 &copy; <a href="http://www.kezhanbang.cn" title="客栈帮，一个具有情怀的客栈团体。" target="_blank">客栈帮</a> 蜀ICP备13025558号-1.
                </div>
                <div class="scroll-to-top">
                    <i class="icon-arrow-up"></i>
                </div>
            </div>
            <!-- END FOOTER -->
        </div>
    </div>
</template>
<script>
    import LeftMenu from './left_menu.vue';
    export default {
        name: 'main_context',
        data() {
        },
        components: {
            LeftMenu
        }
    }
</script>
<style lang="css">

</style>