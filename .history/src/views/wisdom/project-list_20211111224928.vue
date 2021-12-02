<template>
    <div :style="{marginTop:appMarginTop}">
        <div class="mcht-data-head">
            <a href="javascript:;" @click="goApp">
                <img src="../../assets/images/left.png" class="icons-right"/>
            </a>
            <div class="mcht-data-head-title">项目审核</div>
            <div class="mcht-asset-rank-show" @click="selectShow = !selectShow">筛选</div>
            <div v-if="selectShow">
                <div class="mcht-mask" @touchmove.stop.prevent="" :style="{marginTop:appMarginTop}"></div>
                <div class="pull-down-select" :style="{marginTop:appMarginTop}">
                    <div>
                    <input class="search" placeholder="请输入商户或商户名称" v-model="searchName"/>
                    </div>
                    <div class="search-date">
                    <span :class="mchtDateShow1?'search-date-active':'search-date-none'" @click="handleSelect1">{{startTime}}</span>
                    <span class="search-date-zhi">至</span>
                    <span :class="mchtDateShow2?'search-date-active':'search-date-none'" @click="handleSelect2">{{endTime}}</span>
                    <van-popup v-model="mchtDateShow"  position="bottom"  :style="{ height:'200px'}">
                        <van-datetime-picker
                            v-model="currentDate"
                            type="date"
                            :min-date="minDate"
                            :max-date="maxDate"
                            :item-height=22
                            @cancel="cancel"
                            @confirm="confirm"
                        />
                    </van-popup>
                    </div>
                    <div class="search-date">
                    <span class="mcht-reset" style="color: #303030" @click="resetData">重置</span>
                    <span class="mcht-reset" style="color: #73b553;margin-left: 10px;" @click="search">搜索</span>
                    </div>
                </div>
            </div>
        </div>
        <List 
            style="padding: 20px 0 10px;"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div 
                class="list-item"
                v-for="(item, index) in list" 
                :key="index"
                @click="tapDetail(item)"
            >
                <div class="left">
                    <div class="title">场景名称 | {{item.name}}</div>
                    <div class="title">编号 | {{item.serial}}</div>
                    <p v-if="item.updated_at" style="margin-bottom: 8px;">处理时间：{{item.updated_at}}</p>
                    <p>申请时间：{{item.created_at}}</p>
                </div>
                <div class="right">
                    <p v-if="item.rating">级别 {{item.rating}}</p>
                    <Button :style="{background: getColor(item)}">{{item.type}}</Button>
                </div>
            </div>
        </List>
    </div>
</template>
<script>
import Util from '@/util';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { List, Button, Dialog, Popup, DatetimePicker } from 'vant';
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(DatetimePicker);
export default {
    components: { List, Button },
    data() {
        return {
            appMarginTop: '20px',
            params: {
                status: 1,
                page: 1,
                pagesize: 10
            },
            loading: false,
            finished: false,
            list: [],
            selectShow: false,
            searchName: '',
            minDate: new Date(2020, 0, 1),
            maxDate: new Date((new Date)-24*60*60*1000),
            currentDate: new Date((new Date)-24*60*60*1000),
            time: {
                startTime:'',
                endTime:'',
            },
            startTime:'开始时间',
            endTime:'结束时间',
            mchtDateShow:false,
            mchtDateShow1:false,
            mchtDateShow2:false,
        }
    },
    created() {
        this.init();
    },
    computed: {
        ...mapGetters({
            token: 'get_token'
        })
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
        //颜色初始化
        getColor(e) {
            let col = ''
            switch (e.type) {
                case '智慧医院':
                    col = '#EE7F61';
                    break;
                case '智慧餐饮':
                    col = '#744FEC';
                    break;
                default:
                    col = '#1D86F2';
                    break;
            }
            return col;
        },
        //分页加载
        async onLoad() {
            if(!this.token) {
                await Util.getToken();
            }
            const params = {
                ...this.params,
                token: this.token,
                org_name: this.$route.query.orgName
            };
            this.loading = true;
            Util.axiosPost('v1/scenario/scenLists', params).then(res => {
                if(res.status == 200) {
                    const { code, data} = res.data;
                    if(code == 200) {
                        this.list = this.list.concat(data.list || []);
                        if(data.dataend) {
                            this.finished = true;
                            return;
                        }
                        this.params.page += 1;
                        this.loading = false;
                    }
                    if(code == 404) {
                        this.onLoad();
                    }
                }
            })
        },
        tapDetail(e) {
            this.$router.push({
                path: '/wisdom/toExamineDetail',
                query: {
                    id: e.id
                }
            })
        },
        handleSelect1(){
            this.mchtDateShow1=!this.mchtDateShow1
            if(this.mchtDateShow2){
                this.mchtDateShow2=!this.mchtDateShow2
            }
            if(this.mchtDateShow1){
                this.mchtDateShow=this.mchtDateShow1
            }else if(!this.mchtDateShow1){
                this.mchtDateShow=false
            }
        },
        handleSelect2(){
            this.mchtDateShow2=!this.mchtDateShow2
            if(this.mchtDateShow1){
                this.mchtDateShow1=!this.mchtDateShow1
            }
            if(this.mchtDateShow2){
                this.mchtDateShow=this.mchtDateShow2
            }else if(!this.mchtDateShow2){
                this.mchtDateShow=false
            }
        },
        cancel(){
            if(this.mchtDateShow1){
                this.mchtDateShow=false
                this.mchtDateShow1=false
            }else if(this.mchtDateShow2){
                this.mchtDateShow=false
                this.mchtDateShow2=false
            }
        },
        confirm(val){
            let year = val.getFullYear()//年
            let month = val.getMonth() + 1//月
            let day = val.getDate()//日
            let hour = val.getHours()//时
            let minute = val.getMinutes()//分
            if (month >= 1 && month <= 9) { month = `0${month}` }
            if (day >= 1 && day <= 9) { day = `0${day}` }
            if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
            if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
            if(this.mchtDateShow1){
                this.startTime=`${year}-${month}-${day}`
                this.mchtDateShow=false
                this.mchtDateShow1=false
            }else if(this.mchtDateShow2){
                this.endTime=`${year}-${month}-${day}`
                this.mchtDateShow=false
                this.mchtDateShow2=false
            }
        },
        resetData(){
            this.searchName=''
            this.startTime='开始时间'
            this.endTime='结束时间'
        },
        search(){
            this.finished = false
            this.list = [];
            this.params = {
                ...this.params,
                page: 1,
                start_time:this.startTime == '开始时间' ? '' : this.startTime,
                end_time:this.endTime == '结束时间' ? '' : this.endTime,
                name:this.searchName
            };
            this.onLoad();
            this.selectShow=false
        },
        //返回APP
        goApp() {
            window.tl.closePage()
        }
    }
}
</script>
<style scoped>
.oneBor:first-child::after{
    content: "";
    width: 0;
}
.threeBor:nth-of-type(2)::after{
    content: "";
    width: 0;
}
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
.list-item{
    width: 317px;
    background: #FFFFFF;
    border: 0px solid #E4E4E4;
    box-shadow: 0px 0px 4px 0px rgba(78, 78, 78, 0.1);
    border-radius: 7px;
    margin: 0 auto 10px;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.list-item .right{
    width: 80px;
    margin-left: 30px;
    margin-bottom: 2px;
}
.list-item .right p{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4E4E4E;
    line-height: 20px;
    text-align: center;
    margin-bottom: 16px;
}
.list-item .title{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4E4E4E;
    line-height: 1.4;
    margin-bottom: 9px;
}
.list-item p{
    font-size: 11px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8A8A8A;
    opacity: 0.7;
}
.list-item button{
    width: 80px;
    height: 23px;
    background: #1D86F2;
    border: none;
    border-radius: 3px;
    padding: 0;
    margin: 0;
    text-align: center;
    line-height: 23px;
}
.list-item .van-button__text{
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    opacity: 0.7;
}
.mcht-mask{
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.pull-down-select{
  position: absolute;
  z-index: 2;
  top:50px;
  left: 0;
  height: 155px;
  width: 100%;
  background-color: #FFFFFF;
  padding:10px 18px 15px 18px;
  box-sizing: border-box;
}
.search{
  width: 340px;
  height: 34px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #e8e8e8;
}
.search-date{
  margin-top: 10px;
  width: 100%;
  height: 35px;
  display: flex;
}
.search-date-active{
  width: 150px;
  border-bottom: solid 1px #73b553;
  font-size: 15px;
  line-height: 35px;
  text-align: center;
  color: #73b553;
}
.search-date-zhi{
  font-size: 13px;
  line-height: 35px;
  color: #707070;
}
.search-date-none{
  width: 150px;
  border-bottom: solid 1px #e8e8e8;
  font-size: 15px;
  line-height: 35px;
  text-align: center;
  color: #373737;
}
.mcht-reset{
  width: 165px;
  height: 35px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #e8e8e8;
  font-size: 15px;
  line-height: 35px;
  text-align: center;
}
</style>