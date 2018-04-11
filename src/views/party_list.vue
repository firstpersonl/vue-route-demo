<template>
    <div id="display_list">
        <div>
            <el-row :gutter="10">
                <el-col :span="8" :md="6" :sm="8" :xs="12" v-for="party in partys" :key = "party.id" class="card_col" style="margin-bottom: 10px;">
                    <el-card :body-style="{ padding: '0px' }">
                        <router-link :to="'/party/'+party.id">
                            <img :src="party.imgUrl" class="image" style="width: 100%">
                        </router-link>
                        <div style="padding: 8px;">
                            <h4 v-text="party.partyName"></h4>
                            <div class="bottom clearfix">
                                <!--<el-button type="text">详情</el-button>-->
                                <el-button type="warning" size="mini" v-if="party.isshow ===0" @click="invalid(party.partyName)" class="display_card_mini_btn">通知审核</el-button>
                                <router-link :to="'/party_orders/'+party.id">订单</router-link>
                                <el-button type="danger" size="mini" class="display_card_mini_btn" @click="party_delete(party.id)">删除</el-button>
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
            invalid(title) {
                const _this = this;
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/party/invalid',
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
            party_delete(id) {
                const _this = this;
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/party/delete',
                    method: 'get',
                    params: {party_id: id},
                    dataType: 'json'
                }).then((_) => {
                    if (_.data.status == 'SUCCESS') {
                        _this.partys.splice(this.partys.findIndex((item) => {
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
    h4 {
        margin: 5px 0;
    }
</style>