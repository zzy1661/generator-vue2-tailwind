import VueRouter from 'vue-router';
import { routes } from './routes';
const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: '/',
    scrollBehavior: () => ({
      y: 0,
    }),
    routes,
  });

const router = createRouter();
export default router;
