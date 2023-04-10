import router from '/@/router';
import NProgress from 'nprogress';
import getPageTitle from '/@/utils/get-page-title';
import { getToken } from '/@/utils/auth';
import { useUserStore, usePermissionStore } from '/@/store';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { ElMessage } from 'element-plus';

NProgress.configure({ showSpinner: false });

const whiteList: string[] = ['/login'];

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    // start progress bar
    NProgress.start();

    // set page title
    document.title = getPageTitle(to.meta.title);

    // determine whether the user has logged in
    const hasToken = getToken();

    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' });
        NProgress.done();
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        const userStore = useUserStore();
        const hasRoles: boolean =
          userStore.userRoles && userStore.userRoles.length > 0;
        if (hasRoles) {
          next();
        } else {
          try {
            // try to repeat getting roles
            await userStore.getInfo();
            const roles = userStore.userRoles;
            // generate accessible routes map based on roles
            const permissionStore = usePermissionStore();
            const accessRoutes = await permissionStore.generateRoutes(roles);
            // dynamically add accessible routes
            for (const item of accessRoutes) {
              router.addRoute(item);
            }
            next({ ...to, replace: true });
          } catch (error) {
            await userStore.resetInfo();
            ElMessage({
              message: 'Error: 你没有权限访问此页面',
              type: 'error',
            });
            next(`/login?redirect=${to.path}`);
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
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  },
);

router.afterEach(() => {
  NProgress.done();
});
