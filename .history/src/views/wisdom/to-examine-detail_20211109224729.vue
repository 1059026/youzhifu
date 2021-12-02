<template>
    <div :style="{marginTop:appMarginTop}" style="padding-bottom: 47px;">
        <div class="mcht-data-head">
            <a href="javascript:;" @click="$router.go(-1)">
                <img src="../../assets/images/left.png" class="icons-right"/>
            </a>
            <div class="mcht-data-head-title">项目审核</div>
        </div>
        <!-- 基础信息 -->
        <div class="title">
            <img src="../../assets/images/examine/info.png" alt="">
            <span>基础信息</span>
        </div>
        <div class="content">
            <div class="cont-item">
                <label class="w83">场景类型</label>
                <span>{{params.type}}</span>
            </div>
            <div class="cont-item" v-if="params.rating">
                <label class="w83">项目级别</label>
                <span>{{params.rating}}</span>
            </div>
            <div class="cont-item">
                <label class="w83">编号</label>
                <span>{{params.serial}}</span>
            </div>
            <div class="cont-item">
                <label class="w83">名称</label>
                <span>{{params.name}}</span>
            </div>
            <div class="cont-item">
                <label class="w83">地址</label>
                <span>{{params.address}}</span>
            </div>
            <div class="cont-item">
                <label class="w83">商户号</label>
                <div>
                    <p v-for="(item, index) in params.cusid" :key="index">{{item}}</p>
                </div>
            </div>
            <div class="cont-item">
                <label class="w83">商户账户号</label>
                <div>
                    <p v-for="(item, index) in params.account_no" :key="index">{{item}}</p>
                </div>
            </div>
            <!-- <div class="cont-info">
                <div class="cont-item">
                    <label class="w83">商户信息</label>
                    <div class="flex">
                        <img src="../../assets/images/examine/exl.png" alt="">
                        <span>账户信息表.exl</span>
                    </div>
                </div>
                <div class="cont-btn">
                    <a href="javascript:;" @click="tapPreview(params.account)">预览</a>
                    <a href="javascript:;" @click="downLoadFile(params.account, '')">下载</a>
                </div>
            </div> -->
            <div class="cont-item">
                <label class="w83">支付公司</label>
                <span>{{params.pay_company}}</span>
            </div>
            <div class="cont-item">
                <label class="w83">合作年限</label>
                <span>{{params.year}}</span>
            </div>
            <div class="cont-item">
                <label class="w83">约定费率</label>
                <span>{{params.rate}}</span>
            </div>
            <div class="cont-item">
                <label class="w83">对公账户</label>
                <span>{{params.brought_account}}</span>
            </div>
            <div class="cont-item">
                <label class="w83">ISV服务商</label>
                <span>{{params.isv_service}}</span>
            </div>
            <div class="cont-item">
                <label class="w83">ISV代理商</label>
                <span>{{params.isv_agent}}</span>
            </div>
            <div class="cont-info">
                <div class="cont-item">
                    <label>合作协议照片</label>
                </div>
                <div class="cont-img">
                    <div :style="{width: (68 * params.agreement.length + (params.agreement.length - 1) * 6) + 'px'}">
                        <img 
                            :src="item" 
                            alt="" 
                            v-for="(item, index) in params.agreement" 
                            :key="index"
                            @click="tapImagePreview(params.agreement, index)"
                        />
                    </div>
                </div>
            </div>
            <div class="cont-info" style="border-bottom: none;">
                <div class="cont-item">
                    <label>现场照片</label>
                </div>
                <ul class="photo">
                    <li>
                        <img :src="params.door" alt="" @click="tapImagePreview([params.door], 0, false, false)">
                        <p>门头照</p>
                    </li>
                    <li>
                        <img :src="params.place" alt="" @click="tapImagePreview([params.place], 0, false, false)">
                        <p>营业场所照</p>
                    </li>
                    <li>
                        <img :src="params.logo" alt="" @click="tapImagePreview([params.logo], 0, false, false)">
                        <p>logo照</p>
                    </li>
                    <li>
                        <img :src="params.checkstand" alt="" @click="tapImagePreview([params.checkstand], 0, false, false)">
                        <p>收银台照</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 项目投入 -->
        <div class="title">
            <img src="../../assets/images/examine/xmtr.png" alt="">
            <span>项目投入</span>
        </div>
        <div class="content">
            <div class="cont-item">
                <label class="w95">一次性投入</label>
                <span class="red">{{params.one_investment}}</span>
            </div>
            <div class="cont-item">
                <label class="w95">逐年投入</label>
                <span class="red">{{params.gradually_investment}}</span>
            </div>
            <div class="cont-item" style="border-bottom: none;">
                <label class="w95">总投入</label>
                <span class="red">{{params.all_investment}}</span>
            </div>
            <div class="cont-item flex">
                <label class="w95">B到C获客情况</label>
                <div class="cont-btn">
                    <a href="javascript:;" @click="tapPreview(params.account)">预览</a>
                </div>
            </div>
            <!-- <div class="tip">备注：{{params.note}}</div> -->
        </div>
        <!-- 代发信息 -->
        <div class="title">
            <img src="../../assets/images/examine/daifa.png" alt="">
            <span>代发信息</span>
        </div>
        <div class="content">
            <div class="cont-item" :style="{borderBottom: params.is_undertakes == '是' ? '1px solid #E4E4E4' : 'none'}">
                <label class="w95">代发合作</label>
                <span>{{params.is_undertakes}}</span>
            </div>
            <template v-if="params.is_undertakes == '是'">
                <div class="cont-item">
                    <label class="w95">代发人数</label>
                    <span>{{params.undertakes_num}}</span>
                </div>
                <div class="cont-item">
                    <label class="w95">人均代发金额</label>
                    <span class="red">{{params.undertakes_money}}</span>
                </div>
                <div class="cont-item" style="border-bottom: none;">
                    <label class="w95">代发账户</label>
                    <div>
                        <p v-for="(item, index) in params.undertakes" :key="index">{{item}}</p>
                    </div>
                </div>
            </template>
        </div>
        <!-- 对公账户 -->
        <!-- <div class="title">
            <img src="../../assets/images/examine/duigong.png" alt="">
            <span>对公账户</span>
        </div>
        <div class="content">
            <div class="cont-item" style="border-bottom: none;">
                <label class="w95">对公账户</label>
                <span>{{params.brought_account}}</span>
            </div>
        </div> -->
        <!-- 获客信息 -->
        <div class="title">
            <img src="../../assets/images/examine/huoke.png" alt="">
            <span>获客信息</span>
        </div>
        <div class="content">
            <div class="cont-item">
                <label class="w95">获客途径</label>
                <span>{{params.guest_way}}</span>
            </div>
            <div class="cont-item" style="border-bottom: none;">
                <label class="w95">所获账户</label>
                <div>
                    <p v-for="(item, index) in getGuestAccount" :key="index">{{item}}</p>
                </div>
            </div>
        </div>
        <!-- 其它 -->
        <div class="title">
            <img src="../../assets/images/examine/qita.png" alt="">
            <span>其他</span>
        </div>
        <div class="content">
            <div class="doce">备注：{{params.note}}</div>
        </div>
        <!-- 操作按钮 -->
        <div class="content btn" v-if="isApprove">
            <Button class="sp-btn" @click="tapApprove">审批</Button>
            <Button class="qx-btn" @click="goList">取消</Button>
        </div>
        <!-- 审批弹窗 -->
        <van-dialog v-model="isShow" title="" :showCancelButton="false" :showConfirmButton="false">
            <Form validate-first @submit="onSubmit" ref="examine">
                <Field :rules="[{ required: true, message: '请选择是否通过', trigger: 'onChange' }]">
                    <template #input>
                        <div class="dia-item">
                            <div class="dia-title"><span><img src="../../assets/images/examine/info.png" alt=""></span>审核意见</div>
                            <RadioGroup 
                                v-model="dialogParams.status" 
                                direction="horizontal"
                            >
                                <CellGroup>
                                    <Cell :class="{active: dialogParams.status == '2'}" title="通过" clickable @click="dialogParams.status = '2'">
                                        <template #right-icon>
                                            <Radio name="2" />
                                        </template>
                                    </Cell>
                                    <Cell :class="{active: dialogParams.status == '3'}" title="不通过" clickable @click="dialogParams.status = '3'">
                                        <template #right-icon>
                                            <Radio name="3" />
                                        </template>
                                    </Cell>
                                </CellGroup>
                            </RadioGroup>
                        </div>
                    </template>
                </Field>
                <Field :rules="[{ required: dialogParams.status == '2', message: '请选择项目级别', trigger: 'onChange' }]" v-if="dialogParams.status == '2'">
                    <template #input>
                        <div class="dia-item">
                            <div class="dia-title"><span><img src="../../assets/images/examine/project.png" alt=""></span>项目级别</div>
                            <RadioGroup 
                                v-model="dialogParams.rating" 
                                direction="horizontal"
                            >
                                <CellGroup>
                                    <Cell class="w57" :class="{active: dialogParams.name == 'A'}" title="A" clickable @click="dialogParams.rating = 'A'">
                                        <template #right-icon>
                                            <Radio name="A" />
                                        </template>
                                    </Cell>
                                    <Cell class="w57" :class="{active: dialogParams.name == 'B'}" title="B" clickable @click="dialogParams.rating = 'B'">
                                        <template #right-icon>
                                            <Radio name="B" />
                                        </template>
                                    </Cell>
                                    <Cell class="w57" :class="{active: dialogParams.name == 'C'}" title="C" clickable @click="dialogParams.rating = 'C'">
                                        <template #right-icon>
                                            <Radio name="C" />
                                        </template>
                                    </Cell>
                                    <Cell class="w57" :class="{active: dialogParams.name == 'D'}" title="D" clickable @click="dialogParams.rating = 'D'">
                                        <template #right-icon>
                                            <Radio name="D" />
                                        </template>
                                    </Cell>
                                </CellGroup>
                            </RadioGroup>
                        </div>
                    </template>
                </Field>
                <div class="dia-item" style="padding: 25px 20px 0; width: auto;">
                    <div class="dia-title"><span><img src="../../assets/images/examine/remarks.png" alt=""></span>审核备注</div>
                    <Field
                        v-model="dialogParams.operation_log"
                        rows="3"
                        type="textarea"
                        placeholder="点击输入审核意见说明"
                        style="width: 100%; height: auto; min-height: 73px; line-height: 1.6; padding: 6px 8px;"
                        :rules="[{ required: dialogParams.status == '3', message: '请输入审核意见' }]"
                    ></Field>
                </div>
                <div class="dia-btn">
                    <Button native-type="submit">确定</Button>
                    <Button @click="cancel">取消</Button>
                </div>
            </Form>
        </van-dialog>
        <van-dialog v-model="excel.show" title="账户信息表" :showCancelButton="false" :showConfirmButton="true" width='380px'>
            <div style="max-height: 500px; padding: 10px; overflow: auto;">
                <div v-html="excel.SheetActiveTable"></div>
            </div>
        </van-dialog>
    </div>
</template>
<script>
import Vue from 'vue';
import Util from '@/util';
import { mapGetters } from 'vuex';
import { Button, Dialog, Form, Field, RadioGroup, Radio, CellGroup, Cell, Toast, ImagePreview } from 'vant';
import XLSX from 'xlsx';
Vue.use(Toast);
export default {
    components: {
        Button, Form, Field, RadioGroup, Radio, CellGroup, Cell,
        [Dialog.Component.name]: Dialog.Component
    },
    data() {
        return {
            appMarginTop: '20px',
            params: {
                agreement: []
            },
            isApprove: false,
            isShow: false,
            dialogParams: {},
            fileContent: '',
            excel: {
                show: false,
                SheetActiveTable: ''
            }
        }
    },
    created() {
        this.init();
        this.devData();
        this.devApprove();
    },
    computed: {
        ...mapGetters({
            token: 'get_token'
        }),
        getGuestAccount() {
            const { guest_account } = this.params;
            if(guest_account) {
                return guest_account.split(',')
            }
            return ''
        }
    },
    methods: {
        //初始化
        init() {
            let _this = this;
            if(window&&window.tl){
                if(window.tl.setNavigationBarHidden){
                    window.tl.setNavigationBarHidden({
                        hidden: true
                    });
                }
                if(window.tl.getSystemInfo){
                    window.tl.getSystemInfo({
                        success (res) {
                            _this.appMarginTop = Util.floatConvert.divide(res.statusBarHeight,res.pixelRatio)+'px';
                        }
                    })
                }
            }
        },
        //获取数据
        async devData() {
            if(!this.token) {
                await Util.getToken();
            }
            const params = {
                token: this.token,
                id: this.$route.query.id
            };
            Util.axiosPost('v1/scenario/infos', params).then(async res => {
                if(res.status == 200) {
                    const { code, data } = res.data;
                    if(code == 200) {
                        this.params = data || {};
                    }
                    if(code == 404) {
                        this.devData();
                    }
                }
            })
        },
        //是否有审核权限
        async devApprove() {
            if(!this.token) {
                await Util.getToken();
            }
            const params = {
                token: this.token,
                id: this.$route.query.id
            };
            Util.axiosPost('v1/scenario/permissions', params).then(async res => {
                if(res.status == 200) {
                    const { code, data } = res.data;
                    if(code == 200) {
                        this.isApprove = data.permissions;
                    }
                    if(code == 404) {
                        this.devApprove();
                    }
                }
            })
        },
        //预览文件
        initExcelPreview(url) {
            let that = this;
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = 'arraybuffer'
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const data = new Uint8Array(xhr.response)
                    const workbook = XLSX.read(data, { type: 'array' })
                    const sheetNames = workbook.SheetNames // 工作表名称集合
                    that.excel.workbook = workbook
                    that.excel.sheetNames = sheetNames
                    that.excel.sheetNameActive = sheetNames[0]
                    that.getSheetNameTable(sheetNames[0])
                }
            }
            xhr.send()
        },
        //文件处理
        getSheetNameTable(sheetName) {
            let worksheet = this.excel.workbook.Sheets[sheetName]
            let htmlData = XLSX.utils.sheet_to_html(worksheet, {header: '', footer: ''})
            htmlData = htmlData === '' ? htmlData : htmlData.replace(/<table/, '<table class="default-table" border="1px solid #ccc" cellpadding="0" cellspacing="0"')
            htmlData = htmlData === '' ? htmlData : htmlData.replace(/<tr/, '<tr style="background:#b4c9e8"')
            this.excel.SheetActiveTable = htmlData
        },
        //下载文件
        downLoadFile (url, name) {
            // const link = document.createElement('a')
            // link.href = url
            // link.target = '_blank'
            // link.download = name
            // link.style.display = 'none'
            // document.body.append(link)
            window && window.tl && window.tl.openUrl({
                url
            });
            // link.click()
        },
        //审批
        tapApprove() {
            this.isShow = true;
            if(this.$refs.examine) {
                this.$refs.examine.resetValidation();
            }
        },
        //提交审批结果
        async onSubmit() {
            if(!this.token) {
                await Util.getToken();
            }
            const params = {
                token: this.token,
                id: this.$route.query.id,
                ...this.dialogParams
            };
            Util.axiosPost('v1/scenario/audit', params).then(res => {
                if(res.status == 200) {
                    const { code } = res.data;
                    if(code == 200) {
                        this.isShow = false;
                        this.dialogParams = {};
                        Toast('审批成功');
                        this.$router.go(-1);
                    }
                    if(code == 404) {
                        this.onSubmit();
                    }
                }
            })
        },
        //取消审批
        cancel() {
            this.isShow = false;
            this.dialogParams = {};
        },
        //返回列表页
        goList() {
            this.$router.go(-1);
        },
        //合作协议照预览
        tapImagePreview(arr, index, showIndex = true, showIndicators = true) {
            ImagePreview({
                images: arr, //需要预览的图片数组
                startPosition: index,  //初始预览位置
                showIndex: showIndex,  //是否显示页数
                showIndicators: showIndicators  //是否显示轮播指示器
            })
        },
        //预览
        tapPreview(url) {
            this.excel.show = true;
            this.initExcelPreview(url);
        }
    }
}
</script>
<style scoped>
.mcht-data-head{
  height: 45px;
  background-color: #1a6347;
  display: flex;
  align-items: center;
}
.icons-right{
  margin-left:15px;
  height: 17px;
  width: 8px;
}
.mcht-data-head-title{
  font-size: 17px;
  line-height: 14px;
  color: #ffffff;
  margin-left: 129px;
}
.mcht-asset-rank-show{
  color: #96ffbb;
  font-size: 17px;
  margin-left: 103px;
}
.title{
    height: 44px;
    padding: 0 21px;
    background: #F5F7F9;
    display: flex;
    align-items: center;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
}
.title img{
    width: 13px;
    margin-right: 8px;
}
.title span{
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1F1F1F;
}
.content{
    padding: 0 19px;
}
.content label{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8A8A8A;
    line-height: 1.4;
}
.content span{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4E4E4E;
    line-height: 1.4;
    flex: 1;
}
.content span.red{
    color: #EE7F61;
}
.content p{
    margin-bottom: 2px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4E4E4E;
    line-height: 1.4;
}
.content p:last-child{
    margin-bottom: 0;
}
.w83{
    width: 83px;
}
.w95{
    width: 95px;
}
.tip{
    padding: 14px 0 17px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #EE7F61;
    line-height: 17px;
}
.cont-item{
    padding: 16px 0;
    border-bottom: 1px solid #E4E4E4;
    display: flex;
}
.cont-item .flex{
    display: flex;
    align-items: center;
}
.cont-item .flex img{
    width: 11px;
    margin-right: 3px;
}
.cont-item .flex span{
    color: #1A6347;
}
.cont-info{
    border-bottom: 1px solid #E4E4E4;
    padding: 16px 0;
}
.cont-info .cont-item{
    border-bottom: none;
    padding: 0;
}
.cont-btn{
    margin: 16px auto 0;
    text-align: center;
}
.cont-btn a{
    display: inline-block;
    width: 133px;
    height: 47px;
    background: #E4E4E4;
    border-radius: 23px;
    margin: 0 7px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1A6347;
    line-height: 47px;
}
.cont-btn a:last-child{
    background: linear-gradient(0deg, #1A6347 0%, #2F8463 100%);
    color: #FFFFFF;
}
.cont-img{
    overflow-x: auto;
    margin-top: 17px;
}
.cont-img img{
    width: 68px;
    margin-right: 6px;
}
.cont-img img:last-child{
    margin-right: 0;
}
.photo{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 18px;
}
.photo li{
    margin-bottom: 17px;
    width: 47%;
}
.photo img{
    width: 100%;
    display: block;
}
.photo p{
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1A6347;
    text-align: center;
    margin-top: 6px;
}
.doce{
    margin-top: 18px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4E4E4E;
    line-height: 17px;
}
.btn{
    display: flex;
    justify-content: space-between;
    margin-top: 26px;
}
.sp-btn{
    width: 252px;
    height: 47px;
    padding: 0;
    background: linear-gradient(0deg, #1A6347 0%, #2F8463 100%);
    border-radius: 23px 0px 0px 23px;
    line-height: 47px;
    text-align: center;
    border: none;
}
.sp-btn span{
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
}
.qx-btn{
    width: 83px;
    height: 47px;
    padding: 0;
    background: rgba(228, 228, 228, .5);
    border-radius: 0px 23px 23px 0px;
    line-height: 47px;
    text-align: center;
    border: none;
}
.qx-btn span{
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1A6347;
}
.van-dialog{
    width: 310px;
}
.van-form > .van-cell{
    padding: 25px 20px 0;
}
.dia-item{
    width: 100%;
}
.dia-title{
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1F1F1F;
    line-height: 23px;
    margin-bottom: 12px;
}
.dia-title span{
    width: 13px;
    margin-right: 6px;
}
.dia-title span img{
    width: 100%;
    display: block;
}
.dia-item .van-cell-group{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.dia-item .van-cell{
    width: 120px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E4E4E4;
    border-radius: 7px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.dia-item .van-cell.w57{
    width: 57px;
}
.dia-item .van-cell.active{
    border: 1px solid #1A6347;
}
.dia-item .van-cell__title{
    flex: none;
    margin-right: 16px;
}
.dia-item .van-cell.w57 .van-cell__title{
    margin-right: 10px;
}
.dia-item .van-cell__title span{
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8A8A8A;
}
.dia-item .van-cell.active .van-cell__title span{
    color: #1A6347;
}
.dia-item .van-radio{
    margin-right: 0;
}
.dia-btn{
    margin-top: 16px;
}
.dia-btn button{
    width: 50%;
    border: none;
    border-top: 1px solid #E4E4E4;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #8A8A8A;
}
.dia-btn button:first-child{
    border-right: 1px solid #E4E4E4;
}
</style>