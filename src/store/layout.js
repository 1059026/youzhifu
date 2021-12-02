import Vue from 'vue'
import Vuex from 'vuex'
import utils from "../util";

Vue.use(Vuex)

// 应用初始状态
const state = {
    baseData:[],//机构或客户基础数据
    tranRankingData:[],//机构或客户交易排名数据
    transTendencyData:[],//机构或客户交易走势图数据
    transShareData:[],//机构交易占比数据
    assetsData:[],//机构资产评级数据
    organList:[],//机构列表
    mchtList:[],//商户列表
    sortSelectValue:{
        title:'交易额降序',
        value:'1',
    },
    selectTime:{
        startTime:'',
        endTime:'',
        title:'',
    },
    tranRankingDataList:[],
    mchtListData:[],
    orgList:{
        code:'',
        simple_name:'',
        page:false,//是否显示机构列表
        level:'',
    },
    reportType:'1', // 1: 机构，2：客户经理
    loading: false,
}

// 定义所需的 mutations
const mutations = {
    setBaseData(state,param){
        state.baseData = param;
    },
    setTranRankingData(state,param){
        state.tranRankingData = param;
    },
    setTranRankingDataList(state,param){
        state.tranRankingDataList = param;
    },
    setTransTendencyData(state,param){
        state.transTendencyData = param;
    },
    setTransShareData(state,param){
        state.transShareData = param;
    },
    setAssetsData(state,param){
        state.assetsData = param;
    },
    setOrganList(state,param){
        state.organList = param;
    },
    setMchtList(state,param){
        state.mchtList = param;
    },
    setMchtListData(state,param){
        state.mchtListData = param;
    },
    setSortSelectValue(state,param){
        state.sortSelectValue.title =param.title;
        state.sortSelectValue.value =param.value;
    },
    setSelectTime(state,param){
        state.selectTime.startTime =param.startTime;
        state.selectTime.endTime =param.endTime;
        state.selectTime.title = param.title;
    },
    setOrgList(state,param){
        state.orgList=param;
    },
    setReportType(state,param){
        state.reportType=param;
    },
    showLoading(state) {
        state.loading = true
    },
    hideLoading(state) {
        state.loading = false
    }



}

const actions = {
    queryOrganBaseData(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/institutions/index',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    store.commit('setBaseData',resp.data.data);
                    resolve(resp);
                }
            })
        })
    },
    queryOrganTranRanking(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/institutions/summary',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    store.commit('setTranRankingData',resp.data.data);
                    store.commit('setTranRankingDataList',resp.data.data.summary);
                    resolve(resp);
                }
            })

        })
    },
    queryOrganTranTendency(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/institutions/charts',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    store.commit('setTransTendencyData',resp.data.data);
                    resolve(resp);
                }
            })

        })
    },
    queryOrganTransShareData(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/institutions/proportion',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    // console.log(resp.data.data.proportion)
                    store.commit('setTransShareData',resp.data.data);
                    resolve(resp);
                }
            })

        })
    },
    queryAssetsData(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/institutions/assets',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    store.commit('setAssetsData',resp.data.data);
                    resolve(resp);
                }
            })

        })
    },
    queryCustBaseData(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/manager/index',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    store.commit('setBaseData',resp.data.data);
                    resolve(resp);
                }
            })
        })
    },
    queryCustTranRankingData(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/manager/summary',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    store.commit('setTranRankingData',resp.data.data);
                    store.commit('setTranRankingDataList',resp.data.data.summary);
                    resolve(resp);
                }
            })

        })
    },
    queryCustTransTendencyData(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/manager/charts',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    store.commit('setTransTendencyData',resp.data.data);
                    resolve(resp);
                }
            })

        })
    },
    queryOrganList(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/institutions/hierarchy',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    store.commit('setOrganList',resp.data.data);
                    resolve(resp);
                }
            })

        })
    },
    queryMchtList(store,data){
        return new Promise((resolve,reject)=>{
            utils.axiosPost('/v1/institutions/merchants',{
                ...data
            }).then(resp=>{
                if(resp.data.code===200){
                    store.commit('setMchtList',resp.data.data);
                    store.commit('setMchtListData',resp.data.data.data);
                    resolve(resp);
                }
            })

        })
    },
    setOrgListDo(store,data){
        store.commit('setOrgList',data);
    },

}

const getters = {
    getBaseData(state){
        return state.baseData;
    },
    getTranRankingData(state){
        return state.tranRankingData;
    },
    getTranRankingDataList(state){
        return state.tranRankingDataList;
    },
    getTransTendencyData(state){
        return state.transTendencyData;
    },
    getTransShareData(state){
        return state.transShareData;
    },
    getAssetsData(state){
       return state.assetsData;
    },
    getOrganList(state){
        return state.organList;
    },
    getMchtList(state){
        return state.mchtList;
    },
    getMchtListData(state){
        return state.mchtListData;
    },
    getSortSelectValue(state){
        return state.sortSelectValue;
    },
    getSelectTime(state){
        return state.selectTime;
    },
    getOrgList(state){
        return state.orgList;
    },
    getReportType(state){
        return state.reportType;
    },
    getLoading(state){
        return state.loading
    }
}

export default ({
    state,
    getters,
    actions,
    mutations
})
