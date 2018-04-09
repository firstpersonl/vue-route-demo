<template>
    <div id="display_list">
        <div>
            <el-row :gutter="10">
                <el-col :span="8" :md="6" :sm="8" :xs="12" v-for="party in partys" :key = "party.id" class="card_col" style="margin-bottom: 10px;">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="party.imgUrl" class="image" style="width: 100%">
                        <div style="padding: 8px;">
                            <span v-text="party.partyName"></span>
                            <div class="bottom clearfix">
                                <!--<el-button type="text">详情</el-button>-->
                                <el-button type="info" size="mini" v-if="party.isshow ===0" class="display_card_mini_btn">通知审核</el-button>
                                <el-button type="danger" size="mini" class="display_card_mini_btn">删除</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div v-show="pagination.page_count > 1">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-count="pagination.page_count"
                    :page-size="pagination.page_size"
                    @current-change="headerCurrentChange"
                    :current-page.aysc="pagination.current_page">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/container.css';
    import 'element-ui/lib/theme-chalk/pagination.css';
    import {Loading} from 'element-ui';

    export default {
        name: 'display_list',
        data() {
            return {
                partys:[],
                pagination: {
                    page_count: 0,
                    page_size: 10,
                    current_page: 1
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
            headerCurrentChange(currentPage) {
                this.pagination.current_page = currentPage;
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
                    page: _this.pagination.current_page - 1,
                    size: _this.pagination.page_size
                };
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/party/list',
                    method: 'get',
                    dataType: 'json',
                    params: params
                }).then((data) => {
                    _this.partys = data.data.content;
                    _this.pagination.page_count = data.data.totalPages;
                    _this.pagination.current_page = data.data.number + 1;
                    loadingInstance.close();
                }).catch((_) => {
                    loadingInstance.close();
                    _this.$message({
                        message: '加载失败，请稍后重试！',
                        type: 'error'
                    });
                    console.error(_.toString());
                })
            }
        },
        created: function() {
            this.loadData();
        }
    }
</script>
<style lang="css">
    .display_card_mini_btn {
        padding: 7px 10px;
    }
</style>