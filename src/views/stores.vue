<template>
    <div id="store_list">
        <el-container>
            <el-row :gutter="10">
                <el-col :span="8" :md="6" :sm="8" :xs="12" v-for="store in stores" :key="store.id" class="card_col">
                    <el-card :body-style="{ padding: '0px' }">
                        <router-link :to="'/store/'+store.id">
                            <img :src="store.cover.src+'@636w_636h_1c_1e'" class="image" style="width: 100%;">
                        </router-link>
                        <div style="padding: 14px;">
                            <h4 v-text="store.title"></h4>
                            <div>

                                <span class="card_cur" v-text="store.price+'￥'"></span>
                                <el-switch
                                        v-show="store.status"
                                        v-model="store.status"
                                        @change="status_change(store)"
                                        active-value="ON_SALE"
                                        inactive-value="REMOVE_OFF_SHELVES"
                                        active-color="#409EFF"
                                        inactive-color="#ff4949">
                                </el-switch>
                                <el-button size="mini" type="text" @click="delete_store(store)" plain="true">删除</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-container>
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
    import 'element-ui/lib/theme-chalk/card.css';
    import 'element-ui/lib/theme-chalk/switch.css';
    import 'element-ui/lib/theme-chalk/message.css';
    import {Loading} from 'element-ui';

    export default {
        name: 'store_list',
        data() {
            return {
                stores: [],
                pagination: {
                    page_count: 0,
                    page_size: 12,
                    current_page: 0
                }
            }
        },
        computed: {
            pageConfig: function () {
                return this.pagination
            }
        },
        methods: {
            status_change(store) {
                const _this = this;
                _this.$ajax({
                    url: _this.BASE_PATH + "/api/store/status",
                    params: {store_id: store.id,status:store.status},
                    dataType: 'json',
                    method: 'get'
                }).then((_) => {
                    if(_.data.status == 'SUCCESS') {
                        _this.$message({
                            message: store.title + (store.status =='ON_SALE' ? '上架成功' : '已下架'),
                            type: store.status=='ON_SALE' ? 'success' : 'warning'
                        });
                    } else {
                        _this.$message({
                            message: '修改失败',
                            type: 'info'
                        })
                    }
                }).catch((_) => {
                    _this.$message({
                        message: '修改失败',
                        type: 'info'
                    })
                })

            },
            delete_store(store) {
                const _this = this;
                _this.$ajax({
                    url: _this.BASE_PATH + "/api/store/status",
                    method: 'get',
                    dataType: 'json',
                    params: {store_id: store.id,status: 'DELETED'}
                }).then((_) => {
                    if (_.data.status == 'SUCCESS') {
                        _this.stores.splice(this.stores.findIndex((item) => {
                            return item.id == store.id
                        }), 1);
                        _this.$message({
                            message: '删除成功',
                            type: 'info'
                        })
                    }else{
                        _this.$message({
                            message: '删除失败',
                            type: 'error'
                        })
                    }
                }).catch((_) => {
                    _this.$message({
                        message: '删除失败',
                        type: 'error'
                    })
                })

            },
            headerCurrentChange(currentPage) {
                this.pagination.current_page = currentPage - 1;
                this.loadData();
            },
            loadData() {
                let target = document.querySelector('#main_container');
                let loadingInstance = Loading.service({
                    target: target,
                    text: '加载中'
                });
                const _this = this;
                const params = {
                    page: _this.pagination.current_page,
                    size: _this.pagination.page_size
                };
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/store/list',
                    method: 'get',
                    params: params,
                    dataType: 'json'
                }).then(function (data) {
                    _this.stores = data.data.content;
                    _this.pagination.page_count = data.data.totalPages;
                    _this.pagination.current_page = data.data.number;
                    loadingInstance.close();
                }).catch(function (data) {
                    _this.$message({
                        message: '加载失败，请稍后重试！',
                        type: 'error'
                    });
                    loadingInstance.close();
                });
            }
        },
        mounted: function () {
            this.loadData();
        }
    }
</script>
<style lang="css">
    .card_cur {
        color: #b11d04;
    }
    h4{
        margin: 5px 0;
    }
    .card_col {
        margin-bottom: 15px;
    }
    .el-row {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
</style>