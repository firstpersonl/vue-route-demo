<template>
    <div id="display_add">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="小店名称" prop="name">
                <el-col :span="16">
                    <el-input v-model="form.name">
                    </el-input>
                </el-col>
            </el-form-item>
            <!--<el-form-item label="选择分类" prop="categoryId">-->
            <!--<el-select v-model="form.categoryId" placeholder="请选择商品分类">-->
            <!--<el-option v-for="item in category" :key="item.value" :value="item.value" :label="item.name"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="小店简介" prop="story">
                <el-col :span="16">
                    <el-input type="textarea" :rows="3" v-model="form.story">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="小店故事" prop="storyText">
                <el-col :span="16">
                    <el-input type="textarea" :rows="3" v-model="form.storyText">
                    </el-input>
                </el-col>
            </el-form-item>
            <!--<el-form-item label="店主姓名" prop="boosName">-->
                <!--<el-col :span="16">-->
                    <!--<el-input v-model="form.boosName">-->
                    <!--</el-input>-->
                <!--</el-col>-->
            <!--</el-form-item>-->
            <el-form-item label="小店电话" prop="phone">
                <el-col :span="16">
                    <el-input v-model="form.phone">
                    </el-input>
                </el-col>
            </el-form-item>
            <!--<el-form-item label="店主微信" prop="weChat">-->
                <!--<el-col :span="16">-->
                    <!--<el-input v-model="form.weChat">-->
                    <!--</el-input>-->
                <!--</el-col>-->
            <!--</el-form-item>-->
            <el-form-item label="营业时间" prop="workTime">
                <el-col :span="8">
                    <el-time-picker
                            style="width: 100%"
                            is-range="true"
                            v-model="work_time"
                            format="HH:mm"
                            editable="false"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                    </el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="所在城市" prop="province">
                <el-col :span="8" class="el-col-line">
                    <el-select v-model="form.province" placeholder="请选择" @change="get_city" style="width: 100%">
                        <el-option
                                v-for="item in province"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="8" class="el-col-line">
                    <el-select v-model="form.city" placeholder="请选择" style="width: 100%">
                        <el-option
                                v-for="item in city"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-col :span="16">
                    <el-input v-model="form.address">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="栖居族折扣" prop="disCount">
                <el-col :span="16">
                    <el-input v-model.number="form.disCount" placeholder="数字96表示9.6折，输入范围应在10-100之间">
                    </el-input>
                </el-col>
                <el-tag type="success">{{discount_text}}</el-tag>
            </el-form-item>
            <el-form-item label="小店类型" prop="goodsType">
                <el-col :span="16">
                    <el-select v-model="form.goodsType">
                        <el-option
                                v-for="item in goodsTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="封面图片" prop="imgUrl">
                <el-col :span="16">
                    <el-upload
                            action="http://kzbpic.oss-cn-qingdao.aliyuncs.com"
                            accept="image/*"
                            list-type="picture-card"
                            limit="1"
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
            <el-form-item label="文案编辑" prop="describe">
                <el-col :span="16">
                    <vue-editor v-model="form.describe"
                                useCustomImageHandler
                                @imageAdded="handleImageAdded"
                                :editorToolbar="customToolbar">
                    </vue-editor>
                </el-col>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button type="primary" @click="form_submit('form')" v-text="committing?'保存中...':'立即添加'"></el-button>
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
        name: 'display_add',
        data() {
            return {
                category: [
                    {name: '饮', value: 2},
                    {name: '食', value: 1},
                    {name: '思', value: 3},
                    {name: '用', value: 4}
                ],
                goodsTypes: [{value: '体验课和工作坊',label: '体验课和工作坊'},
                    {value: '音乐会',label: '音乐会'},
                    {value: '社会公益',label: '社会公益'},
                    {value: '艺术',label: '艺术'},
                    {value: '餐饮',label: '餐饮'},
                    {value: '大自然',label: '大自然'},
                    {value: '运动',label: '运动'},
                    {value: '历史',label: '历史'},
                    {value: '娱乐',label: '娱乐'},
                    {value: '健康与养生',label: '健康与养生'}
                ],
                committing: false,
                work_time: [new Date(1525564800000),new Date(1523361600000)],
                province: [],
                city: [],
                form: {
                    name: '',
                    disCount: 95,
                    story: '',
                    storyText: '',
                    boosName: '',
                    phone: '',
                    // categoryId: 2,
                    address: '',
                    workTime: '',
                    goodsType: '',
                    weChat: '',
                    imgUrl: '',
                    city: null,
                    province:null,
                    describe: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入小店名称'},
                        {max: 15, message: '长度在最大为 15个字符'}
                    ],
                    story: [
                        {required: true, message: '请填写一句小店的描述'},
                        {max: 50, message: '描述长度最大 为50个字符'}
                    ],
                    storyText: [
                        {required: true, message: '小店故事'},
                        {max: 100, message: '故事长度最大为 100个字符'}
                    ],
                    boosName: [
                        {required: true, message: '小店店主姓名'}
                    ],
                    disCount: [
                        {required: true, message: '请填写栖居族商品折扣'},
                        {pattern: /^[1-9][0-9]$/, message: '折扣格式不正确'},
                        {type: 'number', message: '必须是数字'}
                    ],
                    phone: [
                        {required: true, message: '小店联系电话'},
                        {pattern: /^((13[0-9]|15[0-9]|17[0-9]|18[0-9])+\d{8})$/, message: '输入正确联系电话'}
                    ],
                    address: [
                        {required: true, message: '小店具体门牌地址'}
                    ],
                    workTime: [
                        {required: true, message: '小店营业时间'}
                    ],
                    goodsType: [
                        {required: true, message: '小店营业类型'}
                    ],
                    weChat: [
                        {required: true, message: '小店店主微信'}
                    ],
                    city: [
                        {required: true, message: '请选择城市'}
                    ],
                    province: [
                        {required: true, message: '请选择省份'}
                    ],
                    describe: [
                        {required: true, message: '请编辑小店详细信息'}
                    ],
                    imgUrl: [
                        {required: true, message:'请上传封面图片'}
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
        // watch: {
        //     work_time: function(old, now) {
        //         this.form.workTime = now[0].getHours().toString()+ ':' +(now[0].getMinutes()+1)+'-'+now[1].getHours().toString()+ ':' +(now[1].getMinutes()+1);
        //     }
        // },
        computed: {
            // 计算属性的 getter
            discount_text: function () {
                // `this` 指向 vm 实例
                return this.form.disCount / 10 + '折';
            },
            workTime_text: function() {
                this.form.workTime = (this.work_time[0].getHours()>=10?this.work_time[0].getHours():'0'+this.work_time[0].getHours())+ ':'
                    +(this.work_time[0].getMinutes()>=10?this.work_time[0].getMinutes():'0'+this.work_time[0].getMinutes())+'-'
                    +(this.work_time[1].getHours()>=10?this.work_time[1].getHours():'0'+this.work_time[1].getHours())+ ':' +
                    (this.work_time[1].getMinutes()>=10?this.work_time[1].getMinutes():'0'+this.work_time[1].getMinutes());
                return this.form.workTime;
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
                this.form.imgUrl = null;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleLimit() {
                this.$message({
                    message: '封面图最多上传1张图片。',
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
                    type: 'MERCHANT_COV',
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
                        });
                        _this.form.imgUrl = 'http://kzbpic.oss-cn-qingdao.aliyuncs.com/' + fields.data.key;
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
                        _this.committing = true;
                        _this.$ajax({
                            url: _this.BASE_PATH + '/api/display/add',
                            data: _this.form,
                            method: 'post',
                            dataType: 'json'
                        }).then((result) => {
                            if (result.data.status === 'SUCCESS') {
                                _this.$notify({
                                    title: '添加成功',
                                    message: '小店添加成功。',
                                    type: 'success'
                                });
                                _this.$router.push({path: '/shop_list'});
                            } else {
                                _this.$notify({
                                    title: '添加失败',
                                    message: '添加失败，请刷新页面后重试！',
                                    type: 'error'
                                })
                            }
                        }).catch((error) => {
                            _this.$notify({
                                title: '添加失败',
                                message: '风物添加失败，请刷新页面后重试！',
                                type: 'error'
                            });
                            _this.committing = false;
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            progress(total, loaded) {
                this.percentage = parseInt(loaded / total * 100);
            },
            get_city(super_id) {
                const _this = this;
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/city/city',
                    method: 'get',
                    dataType: 'json',
                    params: {superId: super_id}
                }).then((_) => {
                    _this.city = _.data;
                })
            },
            loadDetail(id) {
                const _this = this;
                _this.$ajax({
                    url: _this.BASE_PATH + '/api/display/detail',
                    method: 'get',
                    dataType: 'json',
                    params: { display_id: id }
                }).then((_) => {
                    if(_.data.province.id) {
                        _this.get_city(_.data.province.id);
                    }
                    _this.form = _.data;
                    _this.form.province = _.data.province.id;
                    _this.form.city = _.data.city.id;
                    _this.fileList.push({
                        url: _.data.imgUrl,
                        name: 'aaaabbbcccddd123.png',
                    })
                }).catch((_) => {
                    _this.$message({
                        message: '加载失败',
                        type: 'error'
                    })
                })
            }
        },
        created: function () {
            const _this = this;
            _this.$ajax({
                url: _this.BASE_PATH + '/api/city/province',
                method: 'get',
                dataType: 'json'
            }).then((p) => {
                _this.province = p.data;
            });

            if(this.$route.params.id) {
                _this.loadDetail(this.$route.params.id)
            }
        }
    }
</script>
<style lang="css">
    .text-center {
        text-align: center;
    }

    @media (max-width: 765px) {
        .el-col-line {
            width: 47.5% !important;
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
    .line {
        text-align: center;
    }
</style>