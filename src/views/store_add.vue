<template>
    <div id="store_add">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="商品名称" prop="name">
                <el-col :span="16">
                    <el-input v-model="form.name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="选择分类" prop="categoryId">
                <el-select v-model.number="form.categoryId" placeholder="请选择商品分类">
                    <el-option label="饮" value="2"></el-option>
                    <el-option label="食" value="1"></el-option>
                    <el-option label="思" value="3"></el-option>
                    <el-option label="用" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品产地" prop="address">
                <el-col :span="16">
                    <el-input v-model="form.address"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="工匠" prop="craftsman">
                <el-col :span="16">
                    <el-input v-model="form.craftsman">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="制作类型" prop="madeType">
                <el-col :span="16">
                    <el-select v-model="form.madeType">
                        <el-option label="纯手工" value="PURE_MANUAL"></el-option>
                        <el-option label="半手工" value="HALF_MANUAL"></el-option>
                        <el-option label="机械" value="MECHANICAL"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="库存" prop="totalNumber">
                <el-col :span="16">
                    <el-input v-model.number="form.totalNumber">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="原价" prop="promotionPrice">
                <el-col :span="16">
                    <el-input v-model.number="form.promotionPrice">
                        <template slot="append"> ¥ </template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="促销价" prop="price">
                <el-col :span="16">
                    <el-input v-model.number="form.price">
                        <template slot="append"> ¥ </template>
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
            <el-form-item label="封面图片" prop="imgUrl">
                <el-col :span="16">
                    <el-upload
                            action="http://kzbpic.oss-cn-qingdao.aliyuncs.com"
                            accept="image/*"
                            list-type="picture-card"
                            limit="8"
                            :on-preview="handlePictureCardPreview"
                            :on-error="handleError"
                            :before-upload="qy_server_upload"
                            :on-exceed="handleLimit"
                            :data="file_data"
                            :file-list="fileList">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-col>
            </el-form-item>
            <el-form-item label="文案编辑" prop="content">
                <el-col :span="16">
                    <vue-editor v-model="form.content"
                                useCustomImageHandler
                                @imageAdded="handleImageAdded"
                                :editorToolbar="customToolbar">
                    </vue-editor>
                </el-col>
            </el-form-item>
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
    import {VueEditor} from 'vue2-editor'
    import {Loading} from 'element-ui';
    export default {
        components: {
            VueEditor
        },
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
                    covers: [],
                    cover:null,
                    madeType: 'PURE_MANUAL',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    content: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入商品名称'},
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符'}
                    ],
                    address: [
                        {required: true, message: '请输入商品产地'},
                        {max: 25, message: '地址长度最大 为25个字符'}
                    ],
                    promotionPrice: [
                        { required: true, message: '请输入商品原价'},
                        { min: 0.01, message: '价格最底为 0.01￥'},
                        { type: 'number', message: '必须是数字'}
                    ],
                    price: [
                        {required: true, message: '请输入商品促销价'},
                        { min: 0.01, message: '价格最底为 0.01￥'},
                        { type: 'number', message: '必须是数字'}
                    ],
                    totalNumber: [
                        {required: true, message: '请输入库存量'},
                        { type: 'number', message: '必须是数字'}
                    ],
                    content: [
                        {required: true, message: '请编辑商品文案'},
                        { type: 'number', message: '必须是数字'}
                    ],
                    craftsman: [
                        {required: true, message: '请输入制作工匠'},
                        {max: 5000, message: '文案长度最长为5000'}
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质'}
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源'}
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式' }
                    ]
                },
                discount_text: '',
                discountFirstNum: 9,
                discountSecondNum: 5,
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [],
                percentage: 0,
                file_data: {},
                customToolbar: [
                    [{ 'header': [false, 2, 3, 4] }],
                    ['bold', 'underline'],        // toggled buttons
                    [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                    [{ 'list': 'bullet' }],
                    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '+1' }],          // outdent/indent
                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    ['image']
                ]
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
            handleError(err, file, fileList) {
                this.$message({
                    message: '上传失败请重试！',
                    type: 'error'
                })
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleLimit() {
                this.$message({
                    message: '最多上传8张图片。',
                    type: 'info'
                })
            },
            qy_server_upload(obj) {
                const _this = this;
                const files = obj;
                if (!files) {
                    _this.$message({
                        message: '请选取一张图片',
                        type: 'info'
                    })
                    return;
                }
                const params = {
                    hotelId: 0,
                    type: 'STORE_COV',
                    fileName: files.name,
                }
                this.$ajax({
                    method: 'get',
                    url: 'http://gl.kezhanbang.cn/api/oss/gen-fields.json',
                    params: params
                }).then(function (fields) {
                    _this.file_data = fields.data;
                    //_this.form.imgUrl = 'http://kzbpic.oss-cn-qingdao.aliyuncs.com/' + fields.data.key;
                    let params = {
                        endPoint: "pic.kezhanbang.cn",
                        hotelid: 0,
                        name: fields.fileName,
                        point: 80,
                        prefix: "",
                        roomId: null,
                        seq: _this.covers.length+1,
                        style: "",
                        type: "STORE_COV",
                    }
                    _this.$ajax({
                        url: _this.BASE_PATH + '/ossImg/image/post.json',
                        method: 'get',
                        data: params
                    }).then((data) => {
                        _this.covers.push(params)
                    })

                });
            },
            handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                let target = document.querySelector('.quillWrapper');
                let loadingInstance = Loading.service({
                    target: target,
                    text: '上传中'
                });

                const _this = this;
                const params = {
                    hotelId: 0,
                    type: 'STORE_COV',
                    fileName: file.name,
                }
                this.$ajax({
                    method: 'get',
                    url: 'http://gl.kezhanbang.cn/api/oss/gen-fields.json',
                    params: params
                }).then(function (fields) {
                    let formData = new FormData();
                    for (let key in fields.data) {
                        formData.append(key, fields.data[key])
                    }
                    formData.append('file', file);
                    _this.$ajax({
                        url: 'http://kzbpic.oss-cn-qingdao.aliyuncs.com',
                        method: 'post',
                        headers: {
                            'Content-Type': 'multipart/form-data' //设置post文件的请求头
                        },
                        data: formData
                    }).then((result) => {
                        let url = 'http://kzbpic.oss-cn-qingdao.aliyuncs.com/' + fields.data.key;
                        Editor.insertEmbed(cursorLocation, 'image', url);
                        resetUploader();
                        loadingInstance.close();
                        //_this.form.imgUrl = 'http://kzbpic.oss-cn-qingdao.aliyuncs.com/' + fields.data.key;
                    }).catch((err) => {
                        loadingInstance.close();
                        console.log(err);
                    })
                });
            }
        },
        created: function () {
            const _this = this;
            const params = {
                hotelId: 0,
                type: 'STORE_COV',
                fileName: 'zzzbbbcccddd123.png',
            }
            this.$ajax({
                method: 'get',
                url: 'http://gl.kezhanbang.cn/api/oss/gen-fields.json',
                params: params
            }).then(function (fields) {
                _this.file_data = fields.data;
                _this.form.imgUrl = 'http://kzbpic.oss-cn-qingdao.aliyuncs.com/' + fields.data.key;
            });
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

    @media (max-width: 765px) {
        .el-col-16 {
            width: 100%;
        }
        .el-select {
            width: 100%;
        }
        .el-form-item__label {
            float: inherit;
        }
        .el-form-item__content {
            margin-left: 0 !important;
        }
    }
    .quillWrapper {
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
    }
    .ql-toolbar.ql-snow {
        border-left: none !important;
        border-top: none !important;
        border-right: none !important;
        border-bottom: 1px solid #dcdfe6 !important;
    }
    .ql-container.ql-snow{
        border: none !important;
    }
</style>