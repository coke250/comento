import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Detail from '../components/Detail'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/:id',
            name: 'Detail',
            component: Detail,
        },
    ]
});

export default router;