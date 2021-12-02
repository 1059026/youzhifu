<template>
    <div class="content" >
        <div style="padding: 15px 20px;">
            <tab-nav :navList="navList"></tab-nav>
        </div>
        <div class="analyzer_set">
            <div class="set_title">
                <van-icon name="newspaper-o" size="20" color="#296348"  />
                <span>历史分析结果</span>
            </div>
            <div>
                <van-button round icon="setting-o" size="mini" color="#296348" >我要分析</van-button>
            </div>
        </div>
        <div class="list_view">
            <List
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    @refresh="onRefresh"
            >
                <div class="cell_list" v-for="(item, index) in analyzerList" :key="index" @click="getDetail(item.id)">
                    <div>
                        <div class="project_name">{{item.name}}</div>
                        <div>分析时间：{{item.create_time}}</div>
                    </div>
                    <div>
                        <img src="../../assets/images/analyzer/A.png" v-if="item.combined_e === 'A'">
                        <img src="../../assets/images/analyzer/B.png" v-else-if="item.combined_e === 'B'">
                        <img src="../../assets/images/analyzer/C.png" v-else>
                    </div>
                </div>
            </List>
        </div>
    </div>
</template>

<script>
    import Util from '@/util';
    import { mapGetters } from 'vuex';
    import tabNav from '../../components/tabNavCom.vue'
    import Vue from 'vue';
    import { Button, Icon, List, cell } from 'vant';

    Vue.use(Button, Icon, cell);
    export default {
        components: { List, tabNav },
        data() {
            return {
                navList: ['场景效益分析器', '场景建设手册'],
                analyzerList: [],
                loading: false,
                finished: false,
                refreshing: false,
                params: {
                    page: 1,
                    pagesize: 10,
                    rating: ''
                }
            }
        },
        computed:{
            ...mapGetters({
                token: 'get_token'
            })
        },
        created() {
            Util.axiosPost('/v1/user/getUserInfo',{
                custType:'U',
                custId:'210326551198922',
                token:'PwHiQragLjuMIstPSAZoBj1TgqkXW46IjFxmFAec3L0qg7pge9HU1A7ea1A1'
            }).then(re=>{
                if(re.data.code===200){
                    this.$store.commit('set_token',re.data.data.token)
                    //sessionStorage.setItem("token",re.data.data.token)

                }
            })
        },
        methods: {
            async onLoad() {
                if(!this.token) {
                    await Util.getToken();
                }
                this.params.token = this.token
                this.loading = true;
                Util.axiosPost('v1/common/analyse/list', this.params).then(res => {
                    if (res.data.code === 200) {
                        this.analyzerList = this.analyzerList.concat(res.data.data.list || [])
                        if(res.data.data.dataend) {
                            this.finished = true;
                            return;
                        }
                        this.params.page += 1;
                        this.loading = false;
                    }
                })
            },
            onRefresh() {
                this.finished = false;
                this.loading = true;
                this.onLoad();
            },
            getDetail(id) {
                this.$router.push({
                    path: '/analyzer/analyzerDetail',
                    query: {
                        id: id
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .content {
    }
    .analyzer_set {
        height: 45px;
        background: #F5F7F8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    }
    .set_title {
        display: flex;
        align-items: center;
        color: #000;
        font-size: 16px;
    }
    .set_title span {
        margin-left: 5px;
    }
    >>> .van-button__text {
        color: #fff;
    }
    >>> .van-button__icon {
        color: #fff;
    }
    >>> .van-button--mini {
        padding: 0 15px;
        line-height: 24px;
    }
    .list_view {
        padding: 0 20px;
    }
    .cell_list {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        color: #525252;
        font-size: 14px;
    }
    .project_name {
        font-size: 16px;
        margin-bottom: 10px;
    }
</style>
