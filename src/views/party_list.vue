<template>
    <div id="display_list">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="8" :md="6" :sm="8" :xs="12" v-for="store in stores" :key = "store.id" class="card_col">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="store.img" class="image" style="width: 100%">
                        <div style="padding: 8px;">
                            <span v-text="store.title"></span>
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
    </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/container.css';
    import 'element-ui/lib/theme-chalk/pagination.css';

    export default {
        name: 'display_list',
        data() {
            return {
                stores:[
                    {
                        title: '好吃的汉堡',
                        id: 1,
                        img: '/src/assets/imgs/hamburger.png',
                        status: true,
                        isshow: 0,
                        free: 23.00
                    },
                    {
                        title: '好吃的汉堡',
                        id: 2,
                        img: '/src/assets/imgs/hamburger.png',
                        status: false,
                        isshow: 0,
                        free: 23.00
                    },
                    {
                        title: '好吃的汉堡',
                        id: 3,
                        img: '/src/assets/imgs/hamburger.png',
                        status: true,
                        isshow: 0,
                        free: 23.00
                    },
                    {
                        title: '好吃的汉堡',
                        id: 4,
                        img: '/src/assets/imgs/hamburger.png',
                        status: true,
                        isshow: 0,
                        free: 23.00
                    },
                    {
                        title: '好吃的汉堡',
                        id:5,
                        img: '/src/assets/imgs/hamburger.png',
                        status: true,
                        isshow: 0,
                        free: 23.00
                    },
                    {
                        title: '好吃的汉堡',
                        id: 6,
                        img: '/src/assets/imgs/hamburger.png',
                        status: true,
                        isshow: 0,
                        free: 23.00
                    }
                ]
            }
        },
        methods: {
            status_change(store) {
                //todo http request do something
                this.$message({
                    message: store.title + (store.status ? '上架成功' : '已下架'),
                    type: store.status?'success':'warning'
                });
            }
        }
    }
</script>
<style lang="css">
    .display_card_mini_btn {
        padding: 7px 10px;
    }
</style>