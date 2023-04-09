import { createRouter, createWebHistory } from 'vue-router';
import { constantRoutes } from '/@/router/routes';

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
