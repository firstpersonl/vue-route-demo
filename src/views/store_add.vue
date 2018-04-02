<template>
    <div id="store_add">
        <el-form ref="form" :model="form" size="small" label-width="80px">
            <el-form-item label="商品名称">
                <el-col :span="16">
                    <el-input v-model="form.name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="选择分类">
                <el-select v-model="form.categoryId" placeholder="请选择商品分类">
                    <el-option label="饮" value="2"></el-option>
                    <el-option label="食" value="1"></el-option>
                    <el-option label="思" value="3"></el-option>
                    <el-option label="用" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品产地">
                <el-col :span="16">
                    <el-input v-model="form.address"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="工匠">
                <el-col :span="16">
                    <el-input v-model="form.craftsman">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="制作类型">
                <el-col :span="16">
                    <el-select v-model="form.madeType">
                        <el-option label="纯手工" value="PURE_MANUAL"></el-option>
                        <el-option label="半手工" value="HALF_MANUAL"></el-option>
                        <el-option label="机械" value="MECHANICAL"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="库存">
                <el-col :span="16">
                    <el-input v-model="form.totalNumber">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="原价">
                <el-col :span="16">
                    <el-input v-model="form.promotionPrice">
                        <template slot="append">.00 ¥</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="促销价">
                <el-col :span="16">
                    <el-input v-model="form.price">
                        <template slot="append">.00 ¥</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="折扣">
                <el-col :span="3">
                    <el-input v-model="discountFirstNum"></el-input>
                </el-col>
                <el-col class="text-center" :span="1">-</el-col>
                <el-col :span="5">
                    <el-input v-model="discountSecondNum">
                        <template slot="append">折</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <div class="el-form-item el-form-item--small">
                <label class="el-form-item__label" style="width: 80px">商品图片</label>
                <div class="el-form-item__content" style="margin-left: 80px">
                    <el-upload
                            action="http://kzbpic.oss-cn-qingdao.aliyuncs.com"
                            list-type="picture-card"
                            limit="10"
                            :on-preview="handlePictureCardPreview"
                            :on-success="uploadSuccess"
                            :on-remove="handleRemove"
                            :before-upload="qy_server_upload"
                            :data="file_data"
                            :file-list="fileList">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </div>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/upload.css';
    import 'element-ui/lib/theme-chalk/dialog.css';
    export default {
        name: 'store_add',
        data() {
            return {
                form: {
                    name: '',
                    address: '',
                    promotionPrice: '',
                    price: '',
                    totalNumber: '',
                    discount: 95,
                    categoryId: '2',
                    craftsman: '',
                    madeType: 'PURE_MANUAL',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                discount_text: '',
                discountFirstNum: 9,
                discountSecondNum: 5,

                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [],
                percentage: 0,
                file_data: {}
            }
        },
        watch: {
            discountSecondNum: function (newNum, olNum) {
                this.discountNumChange()
            },
            discountSecondNum: function (newNum, olNum) {
                this.discountNumChange()
            }
        },
        methods: {
            discountNumChange() {
                this.form.discount = this.discountFirstNum * 10 + this.discountSecondNum;
                console.log(this.form.discount);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadSuccess(response, file, fileList){
                console.log(file)
            },
            qy_server_upload(obj){
                const _this = this;
                const files = obj;
                const params = {
                    hotelId:0,
                    type: 'STORE_COV',
                    fileName: files.name,
                }
                this.$ajax({
                    method: 'get',
                    url: 'http://gl.kezhanbang.cn/api/oss/gen-fields.json',
                    params: params
                }).then(function(fields) {
                    return _this.file_data =  fields.data
                });
            }
        }
    }
</script>
<style lang="css">
    #store_add {
        padding: 0 15px;
    }
    .text-center {
        text-align: center;
    }
    @media (max-width: 765px)  {
        .el-col-16 {
            width: 100%;
        }
        .el-select {
            width: 100%;
        }
    }
</style>