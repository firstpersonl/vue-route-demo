<template>
    <el-main id="store_list">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="8" :md="6" :sm="8" :xs="12" v-for="store in stores" :key = "store.id" class="card_col">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="store.img" class="image" style="width: 100%">
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
                                <span class="card_cur" v-text="store.free+'￥'"></span>
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
                    :page-count="pageConfig.page_count"
                    :page-size="pageConfig.page_size"
                    @current-change="loadData"
                    :current-page.aysc="pageConfig.current_page">
            </el-pagination>
        </el-footer>
    </el-main>

</template>
<script>
import 'element-ui/lib/theme-chalk/card.css';
import 'element-ui/lib/theme-chalk/switch.css';
import 'element-ui/lib/theme-chalk/message.css';
export default {
    name: 'store_list',
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
                type: store.status?'success':'warning'
            });
        },
        loadData() {
            const _this = this;
            _this.$root.$children[0].loading =true;
            const params = {
                page: _this.pagination.current_page,
                size: _this.pagination.page_size
            };
            _this.$ajax({
                url: _this.BASE_PATH + '/api/store/list',
                method: 'get',
                params: params,
                dataType: 'json'
            }).then(function(data) {
                _this.stores = data.data.content;
                _this.pagination.page_count = data.data.totalPages;
                _this.pagination.current_page = data.data.number;
                _this.$root.$children[0].loading =false;

            }).catch(function(data) {
                _this.$message({
                    message: '加载失败，请稍后重试！',
                    type: 'error'
                });
                _this.$root.$children[0].loading =false;
            });
        }
    },
    created: function () {
        this.loadData()
    }
}
</script>
<style lang="css">
    .card_cur{
        float: right;
        padding: 12px 0;
        color: #b11d04;
    }
    .card_col {
        margin-bottom: 15px;
    }
</style>