import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用初始状态
const state = {
    // token:'PwHiQragLjuMIstPSAZoBj1TgqkXW46IjFxmFAec3L0qg7pge9HU1A7ea1A1',//会话token
    token:'',
}

// 定义所需的 mutations
const mutations = {
    set_token(state,param) {
        state.token=param;
    },
}

const actions = {

}

const getters = {
    get_token(state){
        return state.token;
    },
}

export default ({
    state,
    getters,
    actions,
    mutations
})
