import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import user from "./modules/user.js";

export const store = new Vuex.Store({
    modules: {
        user,
    },

    state: {},
    actions: {},
    mutations: {},
});