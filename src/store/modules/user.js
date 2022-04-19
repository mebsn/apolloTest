import axios from "@/utilis/axiosInstance";

const user = {
    state: {
        users: [],
        user: [],
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data;
        },
        SET_USER(state, data) {
            state.user = data;
        }
    },
    actions: {
        async LOAD_USERS({ commit }) {
            try {
                const res = await axios.get("/users");
                commit("SET_USERS", res.data);
            } catch (err) {
                throw new Error(err);
            }
        },
        async LOAD_USER({ commit }, id) {
            try {
                const res = await axios.get(`/users/${id}`);
                commit("SET_USER", res.data);
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    getters: {},
};

export default user;