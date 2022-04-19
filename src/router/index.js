import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./../components/HomePage.vue";
import EditPage from "./../components/EditPage.vue";
import AddUser from "./../components/AddUser.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: '/EditUser/:id',
        name: 'EditUser',
        component: EditPage,
    },
    {
        path: '/addNewUser',
        name: 'addNewUser',
        component: AddUser,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;