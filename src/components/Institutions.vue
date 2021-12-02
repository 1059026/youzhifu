<template>
    <div class="institutions">
        <div style="display: flex; align-items: center;" @click.stop="orgObj.page = !orgObj.page">
            <Icon name="location-o" />
            <span style="color: #4E4E4E; margin-left: 8px;" >{{orgObj.simple_name}}</span>
            <Icon :name="orgObj.page ? 'arrow-up' : 'arrow-down'" class="icons-black" />
        </div>
        <Popup v-model="orgObj.page" position='bottom' :style="{height:'90%'}">
            <div style="height: 100%" class="org-popup">
                <cTree :orgList="[{simple_name:orgPageData.simple_name,code:orgPageData.code,level:orgPageData.level,flag:orgPageData.flag,openFlag:orgPageData.openFlag,child:orgPageData.child}]" v-if="orgPageData.simple_name&&orgPageData.code"></cTree>
                <Empty
                    v-else
                    class="custom-image"
                    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                    description="暂无数据"
                />
            </div>
        </Popup>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Util from '@/util';
import { Popup, Empty, Icon } from 'vant';
import cTree from '@/components/TreeOrg/tree';
export default {
    components: { Popup, Empty, Icon, cTree },
    data() {
        return {
            orgPageData: {
                code: '',
                simple_name: '',//所属机构
                level:'',
                flag:'',
                child:[
                    {code:'',simple_name:'',child:[]}
                ],//机构列表(所有数据)
            },
        }
    },
    computed: {
        ...mapGetters({
            token: 'get_token',
            orgObj: "getOrgList"
        })
    },
    watch: {
        orgObj: {//对机构的选择进行深度监听，数据变化试调用接口
            handler(newobj,oldobj) {
                if(newobj&&oldobj&&newobj.code!=oldobj.code){
                    if(this.orgObj.code&&this.orgObj.level){
                        this.$emit('changInstitu', newobj)
                    }
                }
            },
            deep: true,
        },
    },
    created() {
        this.devData();
    },
    methods: {
        //获取机构
        devData() {
            const params = {
                token: this.token
            };
            Util.axiosPost('v1/scenario/institutions', params).then(async res => {
                if(res.status == 200) {
                    const { code, data } = res.data;
                    if(code == 200) {
                        let obj = data[0];
                        let {code, simple_name,child,level} = obj;
                        this.orgPageData.code = code;
                        this.orgPageData.simple_name = simple_name;
                        this.orgPageData.level =level;
                        this.orgPageData.openFlag =true;
                        this.orgPageData.flag = 'first';
                        this.orgPageData.child = child;//机构列表(所有数据)
                        this.$store.dispatch("setOrgListDo", {code,simple_name,level,page:false});
                    }
                    if(code == 404) {
                        await Util.getToken();
                        this.devData();
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.institutions{
    padding: 14px 21px 13px;
    border-bottom: 1px solid #E4E4E4;
    box-sizing: border-box;
    font-size: 16px;
    display: flex;
    align-items: center;
}
.icons-black{
  margin-left: 8px;
  color: #4E4E4E;
}
.org-popup ul{
    padding: 6px 0;
}
.org-popup li{
    padding: 6px 20px;
}
.org-popup li .icons-black{
    vertical-align: middle;
    margin-right: 8px;
    margin-left: 0;
}
</style>