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

</style>