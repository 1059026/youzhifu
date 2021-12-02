<template>
    <div class="wisdom-nav">
        <router-link 
            v-for="(item, index) in navs"
            :key="index"
            :to="item.link"
            :class="{active: $route.path === item.link}"
        >
            <span>{{item.name}}</span>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navs: [
                {name: '场景概况', link: '/wisdom/projectStatistics'},
                {name: '获客统计', link: '/wisdom/peopleNum'},
                {name: '手续费收入', link: '/wisdom/service-charge'},
                {name: '沉淀资金', link: '/wisdom/precipitationFund'}
            ]
        }
    }
}
</script>

<style scoped>
.wisdom-nav{
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E4E4E4;
    box-shadow: 0px 0px 4px 0px rgba(78, 78, 78, 0.1);
    border-radius: 6px;
    margin: 14px 19px 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.wisdom-nav a{
    width: 25%;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
</style>