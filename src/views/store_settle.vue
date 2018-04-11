<template>
    <div>
        <h4>风物结算</h4>
        <el-table
                :data="settle"
                show-summary
                style="width: 100%">
            <el-table-column
                    label="#"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="订单号"
                    prop="outTradeNo">
            </el-table-column>
            <el-table-column
                    label="总计金额"
                    prop="totalFree">
            </el-table-column>
            <el-table-column
                    label="实际结算"
                    prop="settleFree">
            </el-table-column>
        </el-table>
        <div v-show="pagination.page_count > 1">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-count="pagination.page_count"
                    :page-size="pagination.page_size"
                    @current-change="headerCurrentChange"
                    :current-page.aysc="pagination.current_page + 1">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/table.css';
    import 'element-ui/lib/theme-chalk/table-column.css';
    import {Loading} from 'element-ui';
    export default {
        data() {
            return {
                settle: [],
                pagination: {
                    page_count: 0,
                    page_size: 10,
                    current_page: 0
                }
            }
        },
        methods: {
            loadData(status){
                const _this = this;
                let target = document.querySelector('.main_view')
                let loadingInstance = Loading.service({
                    target: target,
                    text: '加载中'
                });
                const params = {
                    page: _this.pagination.current_page,
                    size: _this.pagination.page_size
                };
                _this.$ajax({
                    url: _this.BASE_PATH + "/api/store/settle/"+status,
                    params: params,
                    method: 'get',
                    dataType: 'json'
                }).then((_) => {
                    _this.settle = _.data.content;
                    _this.pagination.page_count = _.data.totalPages;
                    _this.pagination.current_page = _.data.number;
                    loadingInstance.close();
                });
            },
            headerCurrentChange(currentPage) {
                this.pagination.current_page = currentPage;
                this.loadData();
            }
        },
        watch: {
            '$route' (to, from) {
                this.pagination = {
                    page_count: 0,
                    page_size: 10,
                    current_page: 0
                }
                this.loadData(this.$route.params.status);
            }
        },
        mounted: function() {
            this.loadData(this.$route.params.status);
        }
    }
</script>
<style>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .block {
        margin-bottom: 15px;
        float: right;
    }
</style>