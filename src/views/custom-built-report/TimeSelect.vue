<template>
  <div>
    <div @click.stop="handleShow()" style="display: flex;align-items: center">
      <div v-if="!isNull(selectTime.title)">
        <span class="font" v-if="style1">{{selectTime.title}}</span>
        <span class="data-time" v-else>{{selectTime.title}}</span>
      </div>
      <div v-else>
        <div v-if="style1">
          <span class="font">{{selectTime.startTime}}</span>
          <span class="layout-zhi" style="">至</span>
          <span class="font">{{selectTime.endTime}}</span>
        </div>
        <div v-else>
          <span class="data-time">{{(selectTime.startTime).replace(/-/g,'.')}} - {{selectTime.endTime.replace(/-/g,'.')}}</span>
        </div>
      </div>
      <img src="../../assets/images/select.png" class="icons-select" />
    </div>
        <van-popup v-model="dateShow"  position="bottom"  :style="{ height:'315px'}">
      <div>
        <div class="cancel-button">
          <span class="cancel-button-text" style="color: #707070" @click.stop="dateShow = !dateShow">取消</span>
          <span class="cancel-button-text" style="color: #73b553" @click.stop="handleSubmit()">确定</span>
        </div>
        <div class="time-button" >
          <div v-for="(item,index) in time" :key="index"
               :class="(Time.title===item.title)?'select-item-active':'select-item'" @click="timeChoose(item)">
            <span>{{item.title}}</span>
          </div>
        </div>
        <div class="date-button">
          <span :class="datePickerShow1?'date-active':'date'" @click="handleSelect1()">{{TIME.startTime}}</span>
          <span class="zhi">至</span>
          <span :class="datePickerShow2?'date-active':'date'" @click="handleSelect2()">{{TIME.endTime}}</span>
        </div>
        <div>
          <van-popup v-model="datePickerShow" :overlay=false position="bottom"  :style="{ height:'175px'}">
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
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Popup,DatetimePicker,Dialog } from 'vant';
import Vue from "vue";
import {mapGetters} from 'vuex';


Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Dialog);


export default {
  props:["time","style1"],
  data() {
    return {
      dateShow:false,
      datePickerShow1:false,
      datePickerShow2:false,
      datePickerShow:false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date((new Date)-24*60*60*1000),
      currentDate: new Date((new Date)-24*60*60*1000),
      Time:{
        startTime:'',
        endTime:'',
        title:'',
      },
      TIME:{
        startTime: '开始时间',
        endTime:'结束时间',
        title:''
      }

    }
  },
  computed:{
    ...mapGetters(
        {
          selectTime:'getSelectTime',
        }
    )
  },
  created() {
    this.int();
  },
  methods: {
    int(){
      this.Time.startTime=this.selectTime.startTime
      this.Time.endTime=this.selectTime.endTime
    },
    handleShow(){
      this.int();
      this.dateShow = !this.dateShow
    },
    timeChoose(val){
      this.Time.startTime=val.startTime;
      this.Time.endTime=val.endTime;
      this.Time.title = val.title;
      this.datePickerShow=false
      this.TIME.startTime='开始时间'
      this.TIME.endTime='结束时间'
    },
    handleSubmit(){
      if(((this.TIME.startTime==='开始时间')||(this.TIME.endTime==='结束时间'))
          &&((this.Time.startTime==='')||(this.Time.endTime===''))){
        this.TIME.startTime='开始时间'
        this.TIME.endTime='结束时间'
        Dialog({ message: '开始或结束时间不能为空' });
      }else if(this.Time.startTime!=''&&this.Time.endTime!=''){
        this.$store.commit('setSelectTime',this.Time)
      }else if(this.TIME.startTime!=''&&this.TIME.endTime!=''){
        this.$store.commit('setSelectTime',this.TIME)
      }
      this.dateShow = !this.dateShow
    },
    handleSelect1(){
      this.datePickerShow1=!this.datePickerShow1
      if(this.datePickerShow2){
        this.datePickerShow2=!this.datePickerShow2
      }
      if(this.datePickerShow1){
        this.datePickerShow=this.datePickerShow1
      }else if(!this.datePickerShow1){
        this.datePickerShow=false
      }
    },
    handleSelect2(){
      this.datePickerShow2=!this.datePickerShow2
      if(this.datePickerShow1){
        this.datePickerShow1=!this.datePickerShow1
      }
      if(this.datePickerShow2){
        this.datePickerShow=this.datePickerShow2
      }else if(!this.datePickerShow2){
        this.datePickerShow=false
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
      if(this.datePickerShow1){
        this.TIME.startTime=`${year}-${month}-${day}`
        this.Time.startTime=''
        this.Time.endTime=''
        this.Time.title=''
        this.datePickerShow=false
        this.datePickerShow1=false
        }else if(this.datePickerShow2){
        this.TIME.endTime=`${year}-${month}-${day}`
        this.Time.startTime=''
        this.Time.endTime=''
        this.Time.title=''
        this.datePickerShow=false
        this.datePickerShow2=false
      }
    },
    cancel(){
      console.log(this.TIME.startTime)
      if(this.datePickerShow1){
        this.datePickerShow1=false
      }else if(this.datePickerShow2){
        this.datePickerShow2=false
      }
      this.datePickerShow = false
    },
    isNull(obj){//判断是否为空
      if(obj==null||obj==''){
        return true;
      }else{
        return false
      }
    }
  }
}
</script>
<style>
.icons-select{
  height: 8px;
  width: 10px;
  margin-left: 5px;
}
.time-button{
  height:50px;
  padding: 12px 17px 7px 17px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.cancel-button{
  height:40px;
  padding: 12px 17px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.cancel-button-text{
  font-size: 15px;
  line-height: 15px;
}
.select-item{
  width: 78px;
  height: 28px;
  border-radius: 5px;
  border: solid 1px #e8e8e8;
  font-size: 14px;
  text-align: center;
  line-height: 28px;
  color: #373737;
}
.select-item-active{
  width: 78px;
  height: 28px;
  border-radius: 5px;
  border: solid 1px #73b553;
  font-size: 14px;
  text-align: center;
  line-height: 28px;
  color: #707070;
}
.date-button{
  height:50px;
  padding: 15px 17px 0 17px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.date-active{
  width: 150px;
  border-bottom: solid 1px #73b553;
  font-size: 15px;
  line-height: 35px;
  text-align: center;
  color: #73b553;
}
.zhi{
  font-size: 13px;
  line-height: 35px;
  color: #707070;
}
.date{
  width: 150px;
  border-bottom: solid 1px #e8e8e8;
  font-size: 15px;
  line-height: 35px;
  text-align: center;
  color: #373737;
}
.font{
  font-size: 12px;
  line-height: 12px;
  color: #ffffff;
}
.layout-zhi{
  font-size: 10px;
  line-height: 10px;
  color: #dbf38e;
  margin:0 5px;
}
.data-time{
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
</style>