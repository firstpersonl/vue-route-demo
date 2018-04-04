<template>
    <div id="store_list">
        <el-container>
            <el-row :gutter="20">
                <el-col :span="8" :md="6" :sm="8" :xs="12" v-for="store in stores" :key="store.id" class="card_col">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="store.cover.src" class="image" style="width: 100%">
                        <div style="padding: 14px;">
                            <span v-text="store.title"></span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button">详情</el-button>
                                <el-switch
                                        v-model="store.status"
                                        @change="status_change(store)"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                                <span class="card_cur" v-text="store.price+'￥'"></span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-container>
        <div v-show="pageConfig.page_count > 0">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-count="pageConfig.page_count"
                    :page-size="pageConfig.page_size"
                    @current-change="loadData"
                    :current-page.aysc="pageConfig.current_page + 1">
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
                    page_size: 10,
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
                //todo http request do something
                this.$message({
                    message: store.title + (store.status ? '上架成功' : '已下架'),
                    type: store.status ? 'success' : 'warning'
                });
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
                    _this.pagination.current_page = data.data.number - 1;
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
        float: right;
        padding: 12px 0;
        color: #b11d04;
    }

    .card_col {
        margin-bottom: 15px;
    }

</style>