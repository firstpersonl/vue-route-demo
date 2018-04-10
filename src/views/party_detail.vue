<template>
    <div id="party_add">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="玩法名称" prop="partyName">
                <el-col span="16">
                    <el-input v-model="form.partyName"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="玩法介绍" prop="slug">
                <el-col :span="16">
                    <el-input v-model="form.slug">
                    </el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="联系电话" prop="phone">
                <el-col :span="16">
                    <el-input v-model="form.phone">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="活动联系人" prop="contacts">
                <el-col :span="16">
                    <el-input v-model="form.contacts">
                    </el-input>
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
            <el-form-item label="集合地点" prop="venue">
                <el-col :span="16">
                    <el-input v-model="form.venue">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="报名须知" prop="appoint">
                <el-col :span="16">
                    <el-input v-model="form.appoint" type="textarea">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="活动价格" prop="price">
                <el-col :span="16">
                    <el-input v-model.number="form.price">
                        <template slot="append">￥</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="最多人数" prop="partyMaxNumber">
                <el-col :span="16">
                    <el-input v-model.number="form.partyMaxNumber">
                        <template slot="append">人</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="活动启动人数" prop="setUpMinNumber">
                <el-col :span="16">
                    <el-input v-model.number="form.setUpMinNumber">
                        <template slot="append">人</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="开始时间" prop="beginTime">
                <el-col :span="11">
                    <el-date-picker
                            v-model="form.beginTime"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-col :span="11">
                    <el-date-picker
                            v-model="form.endTime"
                            type="datetime"
                            placeholder="选择结束时间">
                    </el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="报名截止时间" prop="deadLine">
                <el-col :span="11">
                    <el-date-picker
                            v-model="form.deadLine"
                            type="datetime"
                            placeholder="选择结束时间">
                    </el-date-picker>
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
                <el-button type="primary" @click="form_submit('form')" v-text="committing?'保存中...':'立即创建'"></el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
 import {VueEditor} from 'vue2-editor';
 import {Loading} from 'element-ui';
 export default {
     components: {
         VueEditor
     },
     name: 'party_add',
     data() {
         return {
             form: {
                 partyName: '',
                 slug: '',
                 phone: '',
                 contacts: '',
                 province: null,
                 city: null,
                 venue: '',
                 appoint: '',
                 price: null,
                 partyMaxNumber: null,
                 setUpMinNumber: null,
                 beginTime: '',
                 endTime: '',
                 imgUrl: '',
                 describe: '',
                 deadLine: ''
             },
             rules: {
                 partyName:[
                     {required: true, message: '请输入玩法名称'}
                 ],
                 slug: [
                     {required: true, message: '请输入玩法介绍'}
                 ],
                 phone: [
                     {required: true, message: '请输入联系电话'},
                     {pattern: /^((13[0-9]|15[0-9]|17[0-9]|18[0-9])+\d{8})$/, message: '输入正确联系电话'}
                 ],
                 contacts: [
                     {required: true, message: '请输入联系人'}
                 ],
                 province: [
                     {required: true,message: '请选择省份'}
                 ],
                 venue: [
                     {required: true, message: '请输入集合地点'}
                 ],
                 appoint: [
                     {required: true, message: '请输入报名须知'}
                 ],
                 price: [
                     {required: true, message: '请输入活动价格'},
                     {type: 'number', message: '价格必须为数字'}
                 ],
                 partyMaxNumber: [
                     {required: true, message: '请输入活动报名最多人数'},
                     {type: 'number', message: '人数必须为数字'}
                 ],
                 setUpMinNumber: [
                     {required: true, message: '请输入活动启动最少人数'},
                     {type: 'number', message: '人数必须为数字'}
                 ],
                 beginTime: [
                     {required: true, message: '请选择活动开始时间'}
                 ],
                 endTime: [
                     {required: true, message: '请选择活动结束时间'}
                 ],
                 deadLine: [
                     {required: true, message: '请选择活动报名截止时间'}
                 ],
                 imgUrl: [
                     {required: true, message: '请长传一张封面图片'}
                 ],
                 describe: [
                     {required: true, message: '请编辑活动详细介绍'}
                 ]
             },
             province: [],
             city: [],
             fileList: [],
             isLoading: false,
             percentage: 0,
             committing: false
         }
     },
     methods: {
         get_city (super_id) {
             const _this = this;
             _this.form.city = null;
             _this.$ajax({
                 url: _this.BASE_PATH + '/api/city/city',
                 method: 'get',
                 dataType: 'json',
                 params: {superId: super_id}
             }).then((_) => {
                 _this.city = _.data
                 _this.form.city = _.data[0].id;
             })
         },
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
         progress(total, loaded) {
             this.percentage = parseInt(loaded / total * 100);
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
         form_submit(formName) {
             const _this = this;
             _this.$refs[formName].validate((valid) => {
                 if (valid) {
                     _this.committing = true;
                     _this.$ajax({
                         url: _this.BASE_PATH + '/api/party/update',
                         data: _this.form,
                         method: 'post',
                         dataType: 'json'
                     }).then((result) => {
                         if (result.data.status === 'SUCCESS') {
                             _this.$notify({
                                 title: '添加成功',
                                 message: '活动添加成功。',
                                 type: 'success'
                             });
                             _this.$router.push({path: '/party_list'});
                         } else {
                             _this.$notify({
                                 title: '添加失败',
                                 message: '活动添加失败，请刷新页面后重试！',
                                 type: 'error'
                             })
                         };
                         _this.committing =false;
                     }).catch((error) => {
                         _this.$notify({
                             title: '添加失败',
                             message: '活动添加失败，请刷新页面后重试！',
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
         loadDetail(id) {
             const _this = this;
             _this.$ajax({
                 url: _this.BASE_PATH + '/api/party/detail',
                 method: 'get',
                 params: {party_id: id},
                 dataType: 'json'
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
         if(_this.$route.params.id) {
             _this.loadDetail(this.$route.params.id)
         }
     }
 }
</script>
<style lang="css">
    .text-center{
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