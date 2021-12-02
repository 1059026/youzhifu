<template>
    <div class="wisdom-nav">
        <router-link 
            v-for="(item, index) in navs"
            :key="index"
            :to="item.link"
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
                {name: '场景概况', link: ''},
                {name: '获客统计', link: ''},
                {name: '手续费收入', link: ''},
                {name: '沉淀资金', link: ''}
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
    text-align: center;
}
</style>