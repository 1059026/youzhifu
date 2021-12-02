<template>
    <div class="layout">
        <Header :psMsg="title" :goBack="goBack" :backPath="backPath" />
        <router-view />
    </div>
</template>

<script>
    import Header from '@/components/header.vue'
    export default {
        components: {
            Header
        },
        data() {
            return {
                title: '',
                goBack: true,
                backPath: ''
            }
        },
        beforeRouteEnter:(to, from, next)=> {
            next(vm => {
                vm.title = to.meta.title
            });
        },
        watch: {
            $route(to) {
                this.title = to.meta.title
            }
        }
    }
</script>

<style>
    .van-toast .van-toast__text{
        color: #fff;
    }
</style>
