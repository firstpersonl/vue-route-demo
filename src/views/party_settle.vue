<template>
    <div>
        <el-table
                :data="settle"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                            <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ props.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品 ID"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="desc">
            </el-table-column>
        </el-table>
    </div>
</template>

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
                    current_page: 1
                }
            }
        },
        methods: {
            loadData(status) {
                const _this = this;
                const params = {
                    page: _this.pagination.current_page - 1,
                    size: _this.pagination.page_size
                }
                let target = document.querySelector('.main_view')
                let loadingInstance = Loading.service({
                    target: target,
                    text: '加载中'
                });
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/party/settle/'+status,
                    method: 'get',
                    params: params,
                    dataType: 'json'
                }).then((_) => {
                    _this.settle = _.data.content;
                    _this.pagination.page_count = _.data.totalPages;
                    _this.pagination.current_page = _.data.number + 1;
                    loadingInstance.close();
                }).catch((_)=>{
                    _this.$message({
                        message: '加载失败！',
                        type: 'error'
                    });
                    loadingInstance.close();
                })
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
                    current_page: 1
                }
                this.loadData(this.$route.params.status);
            }
        },
        mounted: function () {
            this.loadData(this.$route.params.status);
        }
    }
</script>