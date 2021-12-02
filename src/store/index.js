import Vue from 'vue'
import Vuex from 'vuex'
import common from './common.js'
import initialize from "./initialize";
import layout from "./layout";


Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        common,
        initialize,
        layout
    }
});
