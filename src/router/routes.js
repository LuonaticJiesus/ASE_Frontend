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

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'home',
        path: '/home',
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
        path: '/profile',
        component: () => import('/@/view/profile/index.vue'),
      },
    ],
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'editor',
        path: '/editor',
        component: () => import('/@/view/editor/index.vue'),
        meta: { roles: ['user', 'teacher'] },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'module',
        path: '/module',
        component: () => import('/@/view/module/index.vue'),
        children: [
          {
            name: 'moduleListView',
            path: '',
            component: () => import('/@/view/module/list.vue'),
          },
          {
            name: 'moduleDetailView',
            path: ':id',
            component: () => import('/@/view/module/module.vue'),
            children: [
              {
                name: 'moduleShareView',
                path: 'share',
                component: () => import('/@/view/module/share.vue'),
              },
              {
                name: 'moduleMemberView',
                path: 'member',
                component: () => import('/@/view/module/member.vue'),
              },
              {
                name: 'moduleNoticeView',
                path: 'notice',
                component: () => import('/@/view/module/notice.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'user',
        path: '/user',
        component: () => import('/@/view/user/index.vue'),
        children: [
          {
            name: 'basicInfo',
            path: '',
            component: () => import('/@/view/user/basicInfo.vue'),
          },
          {
            name: 'changePwd',
            path: 'changePwd',
            component: () => import('/@/view/user/changePwd.vue'),
          },
        ],
      },
    ],
  },
];
