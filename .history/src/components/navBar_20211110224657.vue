<template>
    <div class="nav-bar">
        <div class="icon" @click="isShow = !isShow">
            <img src="../assets/images/nav-icon.png" alt="">
        </div>
        <div class="foot-bar" v-if="isShow">
            <router-link to="/wisdom/projectStatistics">
                <em>
                    <img src="../assets/images/examine/info_bar_col.png" alt="" v-if="$route.path == '/wisdom/projectStatistics'">
                    <img src="../assets/images/examine/info_bar.png" alt="" v-else>
                </em>
                <p :class="{active: $route.path == '/wisdom/projectStatistics'}">场景概况</p>
            </router-link>
            <router-link to="/wisdom/peopleNum">
                <em>
                    <img src="../assets/images/examine/huoke_bar_col.png" alt="" v-if="$route.path == '/wisdom/peopleNum'">
                    <img src="../assets/images/examine/huoke_bar.png" alt="" v-else>
                </em>
                <p :class="{active: $route.path == '/wisdom/peopleNum'}">获客统计</p>
            </router-link>
            <router-link to="service-charge">
                <em>
                    <img src="../assets/images/examine/commission_bar_col.png" alt="" v-if="$route.path == '/wisdom/service-charge'">
                    <img src="../assets/images/examine/commission_bar.png" alt="" v-else>
                </em>
                <p>手续费收入</p>
            </router-link>
            <router-link to="/wisdom/precipitationFund">
                <em>
                    <img src="../assets/images/examine/duigong_bar_col.png" alt="" v-if="$route.path == '/wisdom/precipitationFund'">
                    <img src="../assets/images/examine/duigong_bar.png" alt="" v-else>
                </em>
                <p :class="{active: $route.path == '/wisdom/precipitationFund'}">沉淀资金</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: true
        }
    }
}
</script>

<style scoped>
.nav-bar .icon{
    width: 73px;
    height: 73px;
    position: fixed;
    right: 33px;
    bottom: 109px;
    padding: 0;
    margin: 0;
    z-index: 11;
}
.nav-bar .icon img{
    width: 100%;
    display: block;
}
.foot-bar{
    width: 100%;
    height: 118px;
    padding-bottom: 22px;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #F5F7F9;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.foot-bar a{
    width: 25%;
}
.foot-bar a em{
    width: 24px;
    display: block;
    margin: 0 auto;
}
.foot-bar a img{
    width: 100%;
    display: block;
}
.foot-bar a p{
    text-align: center;
    margin-top: 7px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8A8A8A;
    line-height: 20px;
}
.foot-bar a p.active{
    color: #1A6347;
}
</style>