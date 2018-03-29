<template>
    <el-main id="store_list">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="8" :md="8" :sm="12" :xs="24" v-for="store in stores">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="store.img" class="image">
                        <div style="padding: 14px;">
                            <span v-text="store.title"></span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button">详情</el-button>
                                <el-switch
                                        v-model="store.status"
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
            <!--<el-pagination>-->

            <!--</el-pagination>-->
        </el-footer>
    </el-main>

</template>
<script>
import 'element-ui/lib/theme-chalk/card.css';
import 'element-ui/lib/theme-chalk/switch.css';
export default {
    name: 'store_list',
    data() {
        return {
            stores:[
                {
                    title: '好吃的汉堡',
                    img: '/src/assets/imgs/hamburger.png',
                    status: true,
                    free: 23.00
                },
                {
                    title: '好吃的汉堡',
                    img: '/src/assets/imgs/hamburger.png',
                    status: false,
                    free: 23.00
                },
                {
                    title: '好吃的汉堡',
                    img: '/src/assets/imgs/hamburger.png',
                    status: true,
                    free: 23.00
                },
                {
                    title: '好吃的汉堡',
                    img: '/src/assets/imgs/hamburger.png',
                    status: true,
                    free: 23.00
                },
                {
                    title: '好吃的汉堡',
                    img: '/src/assets/imgs/hamburger.png',
                    status: true,
                    free: 23.00
                },
                {
                    title: '好吃的汉堡',
                    img: '/src/assets/imgs/hamburger.png',
                    status: true,
                    free: 23.00
                }
            ]
        }
    }
}
</script>
<style lang="css">
    .card_cur{
        float: right;
        padding: 12px 0;
        color: #b11d04;
    }
</style>