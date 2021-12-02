<template>
    <div :style="{marginTop:appMarginTop}" v-if="isReady">
        <div class="mcht-data-head">
            <a href="javascript:;" @click="goApp">
                <img src="../../assets/images/left.png" class="icons-right"/>
            </a>
            <div class="mcht-data-head-title">项目统计（概览）</div>
        </div>
        <!-- 选择地址 -->
        <Institutions @changInstitu="changInstitu" />
        <!-- 列表 -->
        <div class="list">
            <List v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                <Table :columns="columns" :rows="rows" />
            </List>
        </div>
        <NavBar />
    </div>
</template>
<script>
import Util from '@/util';
import { mapGetters } from 'vuex';
import { List } from 'vant';
export default {
    components: {
        Institutions: () => import('@/components/Institutions'),
        Table: () => import('@/components/Table'),
        NavBar: () => import('@/components/navBar'),
        List
    },
    data() {
        return {
            isReady: false,
            appMarginTop: '20px',
            columns: [
                {name: '所属机构名称', key: 'name'},
                {name: '项目类型', key: 'rating'},
                {name: '数量', key: 'num'}
            ],
            rows: [],
            loading: false,
            finished: false,
            params: {}
        }
    },
    created() {
        this.init();
    },
    computed:{
        ...mapGetters({
            token: 'get_token'
        })
    },
    methods: {
        //初始化
        async init() {
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
            if(!this.token) {
                await Util.getToken();
            }
            this.isReady = true;
        },
        //获取机构
        changInstitu(obj) {
            this.params = {
                ...this.params,
                code: obj.code,
                level: obj.level
            };
            this.onLoad();
        },
        //分页
        onLoad() {
            const params = {
                ...this.params,
                token: this.token
            };
            Util.axiosPost('v1/scenario/situation', params).then(async res => {
                if(res.status == 200) {
                    const { code, data } = res.data;
                    if(code == 200) {
                        this.rows = data.situation || [];
                        this.finished = true;
                    }
                    if(code == 404) {
                        await Util.getToken();
                        this.onLoad();
                    }
                }
            })
        },
        //返回APP
        goApp() {
            window.tl.closePage()
        }
    }
}
</script>
<style scoped>
::placeholder{
    color: #8A8A8A;
    font-size: 14px;
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
  margin-left: 109px;
}
.mcht-asset-rank-show{
  color: #96ffbb;
  font-size: 17px;
  margin-left: 103px;
}
.title{
  padding: 14px 21px 13px;
  border-bottom: 1px solid #E4E4E4;
  box-sizing: border-box;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.icons-black{
  margin-left: 8px;
  color: #4E4E4E;
}
.van-search{
    padding: 17px 19px 14px;
}
.van-search__content{
    height: 40px;
    background: #F5F7F9;
    border: 1px solid #E4E4E4;
    border-radius: 7px;
}
.quxiao{
    display: block;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8A8A8A;
    line-height: 42px;
}
.van-cell{
    padding: 0 8px 0 0;
    line-height: 42px;
    color: #4E4E4E;
}
.list{
    padding: 27px 19px 160px;
}
</style>