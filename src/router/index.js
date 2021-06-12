import VueRouter from 'vue-router';
import Vue from 'vue';
import Registration from '../components/Registration.vue';
import UserDetail from '../components/UserDetail.vue';
import Login from '../components/Login.vue';
Vue.use(VueRouter);

const routes = [
    {
        name: 'register',
        path: '/',
        component: Registration
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'userDetail',
        path: '/userdetail',
        component: UserDetail
    }
];

const router = new VueRouter({
    routes,
});

export default router;