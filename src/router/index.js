import { createRouter, createWebHistory } from 'vue-router';
import { constantRoutes } from '/@/router/routes';
import NProgress from 'nprogress';
// eslint-disable-next-line no-unused-vars
import { getToken } from '/src/utils/auth';
import { useUserStore, usePermissionStore } from '/src/store';
import { ElMessage } from 'element-plus';
import { validateAccount } from '/@/api/user.js';

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/404'];

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  const needValidate = to.query['active_code'];
  if (needValidate) {
    const param = {
      active_code: needValidate,
    };
    await validateAccount(param);
    next('/home');
  }
  // set page title
  // document.title = getPageTitle(to.meta.title);
  // determine whether the user has logged in
  let hasToken = getToken();
  // hasToken += 'DevToken'; // 开发环境使用，暂时认为有token
  // let hasToken = null;
  if (hasToken) {
    {
      // determine whether the user has obtained his permission roles through getInfo
      const userStore = useUserStore();
      let hasRoles = userStore.userRoles && userStore.userRoles.length > 0;
      if (hasRoles) {
        if (to.path === '/login') {
          // if is logged in, redirect to the home page
          next({ path: '/home' });
          NProgress.done();
        }
        next();
      } else {
        try {
          // try to repeat getting roles
          await userStore.getInfo();
          // 暂时的处理
          userStore.setRoles(['user']);

          const roles = userStore.userRoles;
          // generate accessible routes map based on roles
          const permissionStore = usePermissionStore();
          const accessRoutes = await permissionStore.generateRoutes(roles);
          // dynamically add accessible routes
          for (const item of accessRoutes) {
            router.addRoute(item);
          }
          if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/home' });
            NProgress.done();
          }
          next({ ...to, replace: true });
        } catch (error) {
          await userStore.resetInfo();
          ElMessage({
            message: 'Error: 你没有权限访问此页面',
            type: 'error',
          });
          next(`/login?redirect=${to.path}&permission=false`);
          NProgress.done();
        }
      }
    }
  } else {
    // has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}&except=true`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
