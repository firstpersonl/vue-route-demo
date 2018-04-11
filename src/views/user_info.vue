<template>
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="小店名称" prop="name">
            <el-col :span="16">
                <el-input v-model="form.name">
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="店主姓名" prop="boosName">
            <el-col :span="16">
                <el-input v-model="form.boosName">
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
            <el-col :span="16">
                <el-input v-model="form.phone">
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
        <el-form-item label="详细地址" prop="address">
            <el-col :span="16">
                <el-input v-model="form.address">
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="基础运费" prop="expressPrice">
            <el-col :span="16">
                <el-input v-model.number="form.expressPrice" placeholder="风物小店订单基础运费">
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="分销比例（其他人代为销售商品提成）" prop="hotelPercent">
            <el-col :span="16">
                <el-input v-model.number="form.hotelPercent" placeholder="分销比例">
                    <template slot="append"> % </template>
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="支付宝账号名" prop="alipayName">
            <el-col :span="16">
                <el-input v-model="form.alipayName" placeholder="用于订单结算信息核对">
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="支付宝账号" prop="taobaoAccount">
            <el-col :span="16">
                <el-input v-model="form.taobaoAccount" placeholder="用于订单结算">
                </el-input>
            </el-col>
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
        <el-form-item style="float: right">
            <el-button type="primary" @click="form_submit('form')" v-text="committing?'保存中...':'立即保存'"></el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                goodsTypes: [{value: '体验课和工作坊', label: '体验课和工作坊'},
                    {value: '音乐会', label: '音乐会'},
                    {value: '社会公益', label: '社会公益'},
                    {value: '艺术', label: '艺术'},
                    {value: '餐饮', label: '餐饮'},
                    {value: '大自然', label: '大自然'},
                    {value: '运动', label: '运动'},
                    {value: '历史', label: '历史'},
                    {value: '娱乐', label: '娱乐'},
                    {value: '健康与养生', label: '健康与养生'}
                ],
                province: [],
                city: [],
                form: {
                    name: '',
                    hotelWebsite: '',
                    bossName: '',
                    phone: '',
                    address: '',
                    taobaoAccount: '',
                    alipayName: '',
                    goodsType: '',
                    weChat: '',
                    expressPrice: null,
                    city: null,
                    province: null
                },
                committing: false,
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称'},
                        { max: 20, message: '长度最长 20 个字符'}
                    ],
                    hotelWebsite: [
                        { required: false}
                    ],boosName: [
                        { required: true, message: '请输入小店店主姓名'},
                        { max: 20, message: '长度最长 20 个字符'}
                    ],phone: [
                        { required: true, message: '请输入小店联系方式'},
                        {pattern: /^((13[0-9]|15[0-9]|17[0-9]|18[0-9])+\d{8})$/, message: '输入正确联系电话'}
                    ],address: [
                        { required: true, message: '请输入详细门牌号'}
                    ]
                    ,alipayName: [
                        { required: true, message: '请输入支付宝账户名'},
                        { max: 20, message: '长度最长 20 个字符'}
                    ],taobaoAccount: [
                        { required: true, message: '请输入支付宝账号'}
                    ],goodsType: [
                        { required: true, message: '请选择小店类型'}
                    ],weChat: [
                        { required: true, message: '请小店店主微信'},
                        { max: 20, message: '长度最长 20 个字符'}
                    ],expressPrice: [
                        { required: true, message: '请设置基础运费'}
                    ],
                    hotelPercent: [
                        {required: true, message: '请设置分销比例'},
                        {pattern: /^[1-9][0-9]$/, message: '比例格式不正确'},
                    ],
                    province: [
                        {required: true, message: '请选择省份'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
            form_submit(formName) {
                const _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.committing = true;
                        _this.$ajax({
                            url: _this.BASE_PATH + '/api/user/update',
                            data: _this.form,
                            method: 'post',
                            dataType: 'json'
                        }).then((result) => {
                            if (result.data.status === 'SUCCESS') {
                                _this.$notify({
                                    title: '信息更新',
                                    message: '信息更新成功。',
                                    type: 'success'
                                });
                            } else {
                                _this.$notify({
                                    title: '信息更新',
                                    message: '信息更新失败，请刷新页面后重试！',
                                    type: 'error'
                                })
                            }
                            _this.committing = false;
                        }).catch((error) => {
                            _this.$notify({
                                title: '信息更新',
                                message: '信息更新失败，请刷新页面后重试！',
                                type: 'error'
                            });
                            _this.committing = false;
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
            _this.$ajax({
                url: _this.BASE_PATH + '/api/user/info',
                method: 'get',
                dataType: 'json'
            }).then((_)=> {
                if(_.data.data.user.province.id) {
                    _this.get_city(_.data.data.user.province.id);
                }
                _this.form = _.data.data.user;
                _this.form.province = _.data.data.user.province.id;
                _this.form.city = _.data.data.user.city.id;
            }).catch((_) =>{
                console.log("信息获取失败...")
            })
        }
    }
</script>
<style>
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
    .line {
        text-align: center;
    }

</style>