import Layout from '/@/layout/index.vue';
// 五级用户路由，动态加载
// 高一级用户一定能看见低一级用户的所有路由
export const constantRoutes = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('/@/view/home/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/view/login/index.vue'),
  },
  {
    path: '/404',
    component: () => import('/@/view/error-page/404.vue'),
    hidden: true,
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
];

export const userRoutes = [];

export const taRoutes = [];

export const teacherRoutes = [];
