import Layout from '/@/layout/index.vue';
// 五级用户路由，动态加载
// 高一级用户一定能看见低一级用户的所有路由
export const constantRoutes = [
  {
    hidden: true,
    path: '/redirect/:path(.*)',
    component: () => import('/@/view/redirect/index.vue'),
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
        meta: { title: '主页', icon: 'House' },
      },
    ],
    hidden: true,
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
        meta: { title: '发布', icon: 'Edit', roles: ['user', 'teacher'] },
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
        meta: {
          title: '模块',
          icon: 'Collection',
        },
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
                name: 'moduleSharesView',
                path: 'share',
                component: () => import('/@/view/module/share.vue'),
              },
              {
                name: 'moduleMembersView',
                path: 'member',
                component: () => import('/@/view/module/member.vue'),
              },
              {
                name: 'moduleNoticesView',
                path: 'notice',
                component: () => import('/@/view/module/notice.vue'),
              },
              {
                name: 'moduleManageView',
                path: 'manage',
                component: () => import('/@/view/module/manage.vue'),
              },
              {
                name: 'moduleSelfView',
                path: 'self',
                component: () => import('/@/view/module/self.vue'),
              },
            ],
          },
        ],
      },
      {
        name: 'post',
        path: '/post',
        component: () => import('/@/view/post/index.vue'),
        children: [
          {
            name: 'shareSingleView',
            path: ':id',
            component: () => import('/@/view/post/preview.vue'),
          },
        ],
        hidden: true,
      },
      {
        name: 'notice',
        path: '/notice',
        component: () => import('/@/view/notice/index.vue'),
        children: [
          {
            name: 'noticeSingleView',
            path: ':id',
            component: () => import('/@/view/notice/preview.vue'),
          },
        ],
        hidden: true,
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
        meta: { title: '用户', icon: 'User' },
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
