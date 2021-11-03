import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () => import('@/view/pages/Home');

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      keepAlive: true
    }
  },

];

