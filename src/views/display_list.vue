<template>
    <div id="display_list">
        <div>
            <el-row :gutter="10">
                <el-col :span="8" :md="6" :sm="8" :xs="12" v-for="store in stores" :key = "store.id" class="card_col" style="margin-bottom: 15px;">
                    <el-card :body-style="{ padding: '0px' }">
                        <router-link :to="'/shop/'+store.id"><img :src="store.imgUrl" class="image" style="width: 100%"></router-link>
                        <div style="padding: 8px;">
                            <h4 v-text="store.name"></h4>
                            <div class="bottom clearfix">
                                <el-button type="warning" size="mini" v-show="store.isshow === 0" @click="invalid(store.name)">通知审核</el-button>
                                <el-button type="danger" size="mini" @click="display_delete(store.id)">删除</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div style="clear:both;"></div>
        <el-footer>
            <el-pagination v-show="pagination.page_count > 1"
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
    import {Loading} from 'element-ui';

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
            display_delete(id) {
                const _this = this;
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/display/delete',
                    method: 'get',
                    params: {display_id: id},
                    dataType: 'json'
                }).then((_) => {
                    if (_.data.status == 'SUCCESS') {
                        _this.stores.splice(this.stores.findIndex((item) => {
                            return item.id == id
                        }), 1);
                        _this.$message({
                            message: '删除成功',
                            type: 'info'
                        })
                    } else {
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
            invalid(title) {
                const _this = this;
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/display/invalid',
                    method: 'get',
                    params: {title: title},
                    dataType: 'json'
                }).then((_)=>{
                    if(_.data.status == 'SUCCESS') {
                        _this.$message({
                            message: '审核申请发送成功',
                            type: 'success'
                        });
                        //event.setAttribute("disabled","disabled");
                    } else {
                        _this.$message({
                            message: '审核申请发送失败',
                            type: 'info'
                        })
                    }
                    return event;
                }).catch((_) => {
                    _this.$message({
                        message: '审核申请发送失败',
                        type: 'info'
                    })
                })
            },
            loadData(current_page) {
                let target = document.querySelector('.main_view');
                let loadingInstance = Loading.service({
                    target: target,
                    text: '加载中'
                });
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
                    _this.stores = data.data.content;
                    _this.pagination.page_count = data.data.totalPages;
                    _this.pagination.current_page = data.data.number;
                    loadingInstance.close();
                }).catch(function () {
                    _this.$message({
                        message: '加载失败，请稍后重试！',
                        type: 'error'
                    });
                    loadingInstance.close();
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