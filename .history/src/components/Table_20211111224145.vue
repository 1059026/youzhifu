<template>
    <div class="table">
        <table>
            <colgroup>
                <col v-for="(item, index) in columns" :key="index" :style="{width: item.width || 'auto'}" />
            </colgroup>
            <thead>
                <tr>
                    <th
                        v-for="(item, index) in columns" 
                        :key="index"
                    ><span :style="{color: item.color}">{{item.name}}</span></th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(item, index) in rows"
                    :key="index"
                >
                    <td
                        v-for="(v, h) in columns"
                        :key="h"
                        @click="tapProjectList(item, index)"
                    >
                        <span :style="{color: item.color}" v-if="h == 0">{{item[v.key]}}</span>
                        <span v-else>{{item[v.key]}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        rows: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {}
    },
    methods: {
        //进入场景列表
        tapProjectList(item, index) {
            if(index == this.rows.length - 1) return;
            this.$router.push({
                path: '/wisdom/project-list',
                query: {
                    name: item.name
                }
            })
        }
    }
}
</script>
<style scoped>
table{
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    text-align: center;
}
thead{
    border-radius: 4px;
    overflow: hidden;
}
th{
    word-break: break-all;
    overflow-wrap: break-word;
    background: #1A6347;
    padding: 12px;
}
th span{
    max-width: 100%;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
}
td{
    word-break: break-all;
    word-wrap: break-word;
    padding: 10px 12px;
}
td span{
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4E4E4E;
}
th:first-child, td:first-child{
    border-radius: 4px 0 0 4px;
}
th:last-child, td:last-child{
    border-radius: 0 4px 4px 0;
}
tbody tr:nth-of-type(2n) td{
    background: #F5F7F9;
}
</style>