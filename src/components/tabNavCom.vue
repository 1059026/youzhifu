<template>
       <div class="tab_view">
            <div class="tab_box">
                <div v-for="(item, index) in navList"
                     :key="index"
                     @click="changeTab(index)"
                     :class="active === index? 'tab_btn_active':'tab_btn'">
                    {{item}}
                </div>
            </div>
        </div>

</template>

<script>
export default {
    props: {
        navList: Array
    },
    data() {
        return {
            active: 0,
        }
    },
    methods: {
        changeTab(index) {
            this.active = index
        }
    }
}
</script>
<style scoped>
 .tab_view {
       
    }
    .tab_box {
        width: 100%;
        height: 40px;
        background:rgba(255,255,255,1);
        box-shadow: 0 2px 5px 1px rgba(210,210,210,1);
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .tab_btn {
        height: 30px;
        font-size: 14px;
        /*border: 1px solid;*/
        padding: 0 20px;
        line-height: 30px;
        border-radius: 5px;
        color: #585858;
        width: 100px;
        text-align: center;
    }
    .tab_btn_active {
        height: 32px;
        font-size: 14px;
        padding: 0 20px;
        line-height: 32px;
        border-radius: 5px;
        color: #fff;
        background: #296348;
        width: 100px;
        text-align: center;
    }
</style>