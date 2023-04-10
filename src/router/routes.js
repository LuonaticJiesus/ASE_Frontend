import Layout from '/@/layout/index.vue';
// 五级用户路由，动态加载
// 高一级用户一定能看见低一级用户的所有路由
export const constantRoutes = [
  {
    hidden: true,
    path: '/redirect/:path(.*)',
    component: () => import('/@/view/redirect/index'),
  },
  {
    path: '/',
    name: 'root',
    component: Layout,
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
  //{ path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
];

export const userRoutes = [
  {
    path: '/',
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
    path: '/',
    component: Layout,
    children: [
      {
        name: 'profile',
        path: 'profile',
        component: () => import('/@/view/profile/index.vue'),
      },
    ],
  },
];

export const taRoutes = [];

export const teacherRoutes = [];
