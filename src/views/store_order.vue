<template>
    <div>
        <h4>风物订单</h4>
        <el-table
                :data="orders"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="姓名">
                            <span>{{ props.row.customerName }}</span>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <span>{{ props.row.customerPhone }}</span>
                        </el-form-item>
                        <el-form-item label="收货地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="快递名称">
                            <span>{{ props.row.expressName }}</span>
                        </el-form-item>
                        <el-form-item label="快递单号">
                            <span>{{ props.row.expressNo}}</span>
                        </el-form-item>
                        <el-form-item label="下单时间">
                            <span>{{ props.row.payTime}}</span>
                        </el-form-item>
                        <!--<el-form-item label="商品名称">-->
                            <!--<span>{{ props.row.name }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="商品名称">-->
                            <!--<span>{{ props.row.name }}</span>-->
                        <!--</el-form-item>-->
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    prop="commodity.title">
            </el-table-column>
            <el-table-column
                    label="购买数量"
                    prop="number">
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            v-show="scope.row.status !=='SENT'"
                            size="mini"
                            @click="express_info(scope.row)">发货</el-button>
                    <el-button v-show="scope.row.status =='SENT'"
                               size="mini">已发货</el-button>
                </template>
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
    import 'element-ui/lib/theme-chalk/message-box.css';
    import {moment} from 'moment';

    export default {
        data() {
            return {
                orders: [],
                pagination: {
                    page_count: 0,
                    page_size: 10,
                    current_page: 1
                }
            }
        },
        filters: {
            dateString: function (value, formatString) {
                formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
                return moment.unix(value).format(formatString);
            }
        },
        methods: {
            loadData() {
                const _this = this;
                const params = {
                    page: _this.pagination.current_page - 1,
                    size: _this.pagination.page_size
                };
                _this.$ajax({
                    url: _this.BASE_PATH + "/api/store/orders",
                    method: 'get',
                    params: params,
                    dataType: 'json'
                }).then((data) => {
                    _this.orders = data.data.content;
                    _this.pagination.page_count = data.data.totalPages;
                    _this.pagination.current_page = data.data.number;
                })
            },
            headerCurrentChange(currentPage) {
                this.pagination.current_page = currentPage;
                this.loadData();
            },
            express_info(order){
                const _this = this;
                _this.$prompt('请输入快递名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    _this.sent(value,order)
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消发货信息录入.'
                    });
                });
            },
            sent(expressName,order) {
                const _this = this;
                _this.$prompt('请输入快递单号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[0-9]+$/,
                    inputErrorMessage: '快递单号格式不正确'
                }).then(({value}) => {
                    _this.$ajax({
                        url: _this.BASE_PATH + '/api/store/sent',
                        method: 'get',
                        params: {expressName:expressName, expressNo: value, id: order.id},
                        dataType: 'json'
                    }).then((_) => {
                        if (_.data.status =='SUCCESS') {
                            order.status = 'SENT';
                            _this.$message({
                                type: 'success',
                                message: '信息修改成功'
                            });
                        }else {
                            _this.$message({
                                type: 'info',
                                message: '发货信息修改失败.'
                            });
                        }

                    }).catch((_) => {
                        _this.$message({
                            type: 'info',
                            message: '发货信息修改失败.'
                        });
                    })
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消发货信息录入.'
                    });
                });
            }
        },
        created: function () {
            this.loadData();
        }
    }
</script>

<style lang="css">
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