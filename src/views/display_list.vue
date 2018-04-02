<template>
    <div id="display_list">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="8" :md="6" :sm="8" :xs="12" v-for="store in stores" :key = "store.id" class="card_col">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="store.imgUrl" class="image" style="width: 100%">
                        <div style="padding: 8px;">
                            <span v-text="store.name"></span>
                            <div class="bottom clearfix">
                                <el-button type="text">详情</el-button>
                                <el-button type="info" size="mini" v-if="store.isshow ===0" class="display_card_mini_btn">通知审核</el-button>
                                <el-button type="danger" size="mini" class="display_card_mini_btn">删除</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-count="pagination.page_count"
                    :page-size="pagination.page_size"
                    @current-change="loadData"
                    :current-page="pagination.current_page + 1">
            </el-pagination>
        </el-footer>
    </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/container.css';
    import 'element-ui/lib/theme-chalk/pagination.css';

    export default {
        data() {
            return {
                stores:[],
                pagination: {
                    page_count: 0,
                    page_size: 10,
                    current_page: 0
                }
            }
        },
        methods: {
            status_change(store) {
                //todo http request do something
                this.$message({
                    message: store.title + (store.status ? '上架成功' : '已下架'),
                    type: store.status?'success':'warning'
                });
            },
            loadData(current_page) {
                const _this = this;
                if (current_page) {
                    _this.pagination.current_page = current_page-1;
                }
                _this.$root.$children[0].loading =true;
                const params =  {
                    page: _this.pagination.current_page,
                    size: _this.pagination.page_size
                };
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/display/list',
                    method: 'get',
                    params: params,
                    dataType: 'json',
                }).then(function (data) {
                    console.log(data);
                    _this.stores = data.data.content;
                    _this.pagination.page_count = data.data.totalPages;
                    _this.pagination.current_page = data.data.number;
                    _this.$root.$children[0].loading =false;
                }).catch(function () {
                    _this.$message({
                        message: '加载失败，请稍后重试！',
                        type: 'error'
                    });
                    _this.$root.$children[0].loading =false;
                })
            }
        },
        created: function () {
            this.loadData();
        }
    }
</script>
<style lang="css">
    .display_card_mini_btn {
        padding: 7px 10px;
    }
</style>