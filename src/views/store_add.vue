<template>
    <div id="store_add">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="商品名称" prop="title">
                <el-col :span="16">
                    <el-input v-model="form.title">
                    </el-input>
                </el-col>
            </el-form-item>
            <!--<el-form-item label="选择分类" prop="categoryId">-->
            <!--<el-select v-model="form.categoryId" placeholder="请选择商品分类">-->
            <!--<el-option v-for="item in category" :key="item.value" :value="item.value" :label="item.name"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="商品产地" prop="producingArea">
                <el-col :span="16">
                    <el-input v-model="form.producingArea">
                    </el-input>
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
                        <el-option label="纯手工" value="PURE_MANUAL">
                        </el-option>
                        <el-option label="半手工" value="HALF_MANUAL">
                        </el-option>
                        <el-option label="机械" value="MECHANICAL">
                        </el-option>
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
                        <template slot="append"> ¥</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="促销价" prop="price">
                <el-col :span="16">
                    <el-input v-model.number="form.price">
                        <template slot="append"> ¥</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="栖居族折扣" prop="discount">
                <el-col :span="16">
                    <el-input v-model.number="form.discount" placeholder="数字96表示9.6折，输入范围应在10-100之间">
                    </el-input>
                </el-col>
                <el-tag type="success">{{discount_text}}</el-tag>
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
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :before-upload="qy_server_upload"
                            :on-exceed="handleLimit"
                            :data="file_data"
                            :file-list="fileList">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-progress type="circle" :percentage="percentage" v-show="isLoading"></el-progress>
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
            <el-form-item style="float: right">
                <el-button type="primary" @click="form_submit('form')" v-text="isLoading?'保存中...':'立即添加'"></el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/upload.css';
    import 'element-ui/lib/theme-chalk/notification.css';
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
                category: [
                    {name: '饮', value: 2},
                    {name: '食', value: 1},
                    {name: '思', value: 3},
                    {name: '用', value: 4}
                ],
                form: {
                    title: '',
                    producingArea: '',
                    promotionPrice: null,
                    price: null,
                    totalNumber: null,
                    discount: 95,
                    // categoryId: 2,
                    craftsman: '',
                    covers: [],
                    cover: {},
                    madeType: 'PURE_MANUAL',
                    content: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入商品名称'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符'}
                    ],
                    producingArea: [
                        {required: true, message: '请输入商品产地'},
                        {max: 25, message: '地址长度最大 为25个字符'}
                    ],
                    promotionPrice: [
                        {required: true, message: '请输入商品原价'},
                        {type: 'number', message: '必须是数字'}
                    ],
                    price: [
                        {required: true, message: '请输入商品促销价'},
                        {type: 'number', message: '必须是数字'}
                    ],
                    discount: [
                        {required: true, message: '请填写栖居族商品折扣'},
                        {pattern: /^[1-9][0-9]$/, message: '折扣格式不正确'},
                        {type: 'number', message: '必须是数字'}
                    ],
                    totalNumber: [
                        {required: true, message: '请输入库存量'},
                        {type: 'number', message: '必须是数字'}
                    ],
                    content: [
                        {required: true, message: '请编辑商品文案'}
                    ],
                    craftsman: [
                        {required: true, message: '请输入制作工匠'},
                        {max: 5000, message: '文案长度最长为5000'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式'}
                    ]
                },
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [],
                isLoading: false,
                percentage: 0,
                file_data: {},
                customToolbar: [
                    [{'header': [false, 2, 3, 4]}], ['bold', 'underline'],
                    [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                    [{'list': 'bullet'}], [{'indent': '+1'}],
                    [{'color': []}, {'background': []}], ['image']
                ]
            }
        },
        watch: {},
        computed: {
            // 计算属性的 getter
            discount_text: function () {
                // `this` 指向 vm 实例
                return this.form.discount / 10 + '折';
            }
        },
        methods: {
            handleSuccess(response, file, fileList) {
                console.log(file, fileList)
            },
            handleError(err, file, fileList) {
                this.$message({
                    message: '上传失败请重试！',
                    type: 'error'
                })
            },
            handleRemove(file, fileList) {
                this.fileList.splice(this.fileList.findIndex((item) => {
                    return item.uid == file.uid
                }), 1);
                this.form.covers.splice(this.form.covers.findIndex((item) => {
                    return item.uid === file.uid;
                }), 1);
                if (this.from.covers.length == 0) {
                    this.from.cover = null;
                }
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
                _this.$ajax({
                    method: 'get',
                    url: _this.BASE_PATH + '/api/oss/gen-fields.json',
                    params: params
                }).then((fields) => {
                    _this.file_data = fields.data;
                    let formData = new FormData();
                    for (let key in fields.data) {
                        formData.append(key, fields.data[key]);
                    }
                    formData.append('file', files);
                    _this.isLoading = true;
                    _this.$ajax({
                        url: 'http://kzbpic.oss-cn-qingdao.aliyuncs.com',
                        headers: {
                            'Content-Type': 'multipart/form-data' //设置post文件的请求头
                        },
                        method: 'post',
                        onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
                            if (progressEvent.lengthComputable) {
                                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                                _this.progress(progressEvent.total, progressEvent.loaded)
                            }
                        },
                        data: formData
                    }).then((result) => {
                        _this.fileList.push({
                            name: files.name,
                            uid: files.uid,
                            url: 'http://kzbpic.oss-cn-qingdao.aliyuncs.com/' + fields.data.key
                        })
                        let params = {
                            endPoint: "pic.kezhanbang.cn",
                            hotelid: 0,
                            name: fields.data.fileName,
                            point: 80,
                            prefix: "",
                            roomId: null,
                            seq: _this.form.covers.length + 1,
                            style: "",
                            type: "STORE_COV",
                            uid: files.uid
                        }
                        _this.$ajax({
                            url: _this.BASE_PATH + '/api/ossImg/image/post.json',
                            method: 'post',
                            data: params
                        }).then(() => {
                            _this.form.covers.push(params);
                            if (params.seq = 1) {
                                _this.form.cover = params
                            }
                        });
                        _this.isLoading = false;
                    }).catch((err) => {
                        console.log(err);
                    })
                });
                return false;
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
                    url: _this.BASE_PATH + '/api/oss/gen-fields.json',
                    params: params
                }).then(function (fields) {
                    let formData = new FormData();
                    for (let key in fields.data) {
                        formData.append(key, fields.data[key]);
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
                    }).catch((err) => {
                        loadingInstance.close();
                        console.log(err);
                    })
                });
            },
            form_submit(formName) {
                const _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$ajax({
                            url: _this.BASE_PATH + '/api/store/add_store',
                            data: _this.form,
                            method: 'post',
                            dataType: 'json'
                        }).then((result) => {
                            if (result.data.status === 'SUCCESS') {
                                _this.$notify({
                                    title: '添加成功',
                                    message: '风物添加成功。',
                                    type: 'success'
                                });
                                _this.$router.push({path: '/'});
                            } else {
                                _this.$notify({
                                    title: '添加失败',
                                    message: '风物添加失败，请刷新页面后重试！',
                                    type: 'error'
                                })
                            }
                        }).catch((error) => {
                            _this.$notify({
                                title: '添加失败',
                                message: '风物添加失败，请刷新页面后重试！',
                                type: 'error'
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            progress(total, loaded) {
                this.percentage = parseInt(loaded / total * 100);
            }

        },
        created: function () {
            // const _this = this;
            // const params = {
            //     hotelId: 0,
            //     type: 'STORE_COV',
            //     fileName: 'zzzbbbcccddd123.png',
            // }
            // this.$ajax({
            //     method: 'get',
            //     url: 'http://gl.kezhanbang.cn/api/oss/gen-fields.json',
            //     params: params
            // }).then(function (fields) {
            //     _this.file_data = fields.data;
            // });
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

    .ql-container.ql-snow {
        border: none !important;
    }
</style>