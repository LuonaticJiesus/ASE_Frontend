import { createRouter, createWebHistory } from 'vue-router';
import { constantRoutes } from '/@/router/routes';
export const accessedRoutes = [];

accessedRoutes.push(constantRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes: accessedRoutes,
});

export default router;
