<template>
    <div>
        <div class="header" @click="goApp" :style="{marginTop:appMarginTop}">
            <van-icon v-if="goBack" name="arrow-left" size="20"  color="#fff"  />
            <p>{{psMsg}}</p>
        </div>
    </div>

</template>

<script>
    import Util from '@/util';
    import Vue from 'vue';
    import { Icon } from 'vant';

    Vue.use(Icon);
    export default {
        name: 'Header',
        props: {
            psMsg: String,
            backPath: String,
            goBack: Boolean
        },
        data() {
            return {
                appMarginTop: '20px',
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                //初始化
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
            goApp () {
                window.tl.closePage()
            }
        }
    }
</script>

<style scoped>
    .header {
        width: 100%;
        height: 45px;
        color: #fff;
        background: #296348;
        font-size: 16px;
        line-height: 45px;
        display:flex;
        align-items: center;
        z-index: 10;
    }
    p {
        width: 90%;
        padding: 0;
        margin: 0;
        text-align: center;
        color: #fff;
    }
</style>
