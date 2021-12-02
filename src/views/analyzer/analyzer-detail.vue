<template>
    <div class="content">
        <!--收益-->
        <div class="analyzer_set">
            <div class="set_title">
                <van-icon name="description" size="20" color="#296348"  />
                <span>受益</span>
            </div>
        </div>
        <div>
            <van-cell-group>
                <van-field v-model="analyzerData.earnings_a" label="年手续费收入" name="earnings_a" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
                <van-field v-model="analyzerData.earnings_b" label="累计手续费收入" name="earnings_b" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
                <van-field v-model="analyzerData.earnings_c" label="预估沉淀收益" name="earnings_c" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
                <van-field v-model="analyzerData.earnings_d" label="累计沉淀收益" name="earnings_d" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
                <van-field v-model="analyzerData.earnings_e" label="年代发收入" name="earnings_e" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
                <van-field v-model="analyzerData.earnings_f" label="累计代发收入" name="earnings_f" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
                <van-field v-model="analyzerData.earnings_g" label="其他收入" name="earnings_g" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
            </van-cell-group>
        </div>
        <!--合计-->
        <div class="analyzer_set">
            <div class="set_title">
                <van-icon name="description" size="20" color="#296348"  />
                <span>合计</span>
            </div>
        </div>
        <div>
            <van-cell-group>
                <van-field v-model="analyzerData.combined_a" label="年收入" name="combined_a" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
                <van-field v-model="analyzerData.combined_b" label="累计收入" name="combined_b" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
                <van-field v-model="analyzerData.combined_c" label="成本" name="combined_c" placeholder="请输入" readonly >
                    <template #extra >
                        <div>万元</div>
                    </template>
                </van-field>
                <van-field v-model="analyzerData.combined_d" label="投资收益率" name="combined_d" placeholder="请输入" readonly >
                    <template #extra >
                        <div>%</div>
                    </template>
                </van-field>
                <van-field error v-model="value" label="项目评级" name="combined_e" :placeholder="analyzerData.combined_e" readonly />
            </van-cell-group>
        </div>
        <!--项目评级评语-->
        <div class="comment">
            {{analyzerData.combined_f}}
        </div>
        <!--底部按钮-->
        <div class="btn">
            <van-button round type="info" size="large" color="#296348" @click="goBack">历史分析列表</van-button>
        </div>
    </div>
</template>
<script>
    import Util from '@/util';
    import { mapGetters } from 'vuex';
    import Vue from 'vue';
    import { Field, CellGroup } from 'vant';

    Vue.use(Field);
    Vue.use(CellGroup);
    export default {
        data() {
            return {
                value: '',
                analyzerData: {}
            }
        },
        computed: {
            ...mapGetters({
                token: 'get_token'
            }),
        },
        created() {
            this.getList()
        },
        methods: {
            //获取数据
            async getList() {
                if(!this.token) {
                    await Util.getToken();
                }
                const params = {
                    token: this.token,
                    id: this.$route.query.id
                };
                Util.axiosPost('v1/common/analyse/detail', params).then( res => {
                    if (res.data.code === 200) {
                        this.analyzerData = res.data.data
                    }
                })
            },
            goBack() {
                this.$router.go('-1')
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
        line-height: 45px;
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
    .comment {
        color: #ff0000;
        text-align: center;
        padding: 50px 0;
    }
    >>> .van-button__text {
        color: #fff;
    }
    .btn {
        padding: 50px 20px;
    }
</style>
