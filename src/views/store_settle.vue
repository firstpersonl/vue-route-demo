<template>
    <div>
        <h4>风物结算</h4>
        <el-table
                :data="settle"
                show-summary
                style="width: 100%">
            <!--<el-table-column type="expand">-->
                <!--<template slot-scope="props">-->
                    <!--<el-form label-position="left" inline class="demo-table-expand">-->
                        <!--<el-form-item label="商品名称">-->
                            <!--<span>{{ props.row.name }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="所属店铺">-->
                            <!--<span>{{ props.row.shop }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="商品 ID">-->
                            <!--<span>{{ props.row.id }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="店铺 ID">-->
                            <!--<span>{{ props.row.shopId }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="商品分类">-->
                            <!--<span>{{ props.row.category }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="店铺地址">-->
                            <!--<span>{{ props.row.address }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="商品描述">-->
                            <!--<span>{{ props.row.desc }}</span>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->
                <!--</template>-->
            <!--</el-table-column>-->
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

    export default {
        data() {
            return {
                settle: [],
                pagination: {
                    page_count: 0,
                    page_size: 10,
                    current_page: 1
                }
            }
        },
        methods: {
            loadData(){
                const _this = this;
                const params = {
                    page: _this.pagination.current_page - 1,
                    size: _this.pagination.page_size
                };
                _this.$ajax({
                    url: _this.BASE_PATH + "/api/store/settle",
                    params: params,
                    method: 'get',
                    dataType: 'json'
                }).then((_) => {
                    _this.settle = _.data.content;
                    _this.pagination.page_count = _.data.totalPages;
                    _this.pagination.current_page = _.data.number;
                });
            },
            headerCurrentChange(currentPage) {
                this.pagination.current_page = currentPage;
                this.loadData();
            }
        },
        created: function() {
            this.loadData();
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