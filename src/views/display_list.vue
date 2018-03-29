<template>
    <div id="display_list">
        <el-main>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-lg-3">
                    <div class="panel">
                        <img class="img-thumbnail"
                             src="http://pic.kezhanbang.cn/0/merchant/cov/579ebac4a24d4d59bdb36db11edfc51f.jpg" alt="">
                        <div class="panel-body">
                            <h4>SHANGHUA</h4>
                            <div>
                                <button class="btn btn-info">详情</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
        <el-footer>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </el-footer>
    </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/container.css';
    import 'element-ui/lib/theme-chalk/pagination.css';

    export default {
        name: 'display_list',
        data() {
            return {
                display: []
            }
        },
        created() {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.setData()
        },
        methods: {
            setData() {
                this.$ajax({
                    method: 'get',
                    params: {
                        page: 0,
                        size: 10
                    },
                    dataType: 'json',
                    url: '/api/display/list',
                    data: function (data) {
                        this.data = data;
                    }
                })
            }
        }
    }
</script>
<style lang="css">

</style>