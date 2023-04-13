import { defineStore } from 'pinia';
import { constantRoutes, asyncRoutes } from '/@/router/routes.js';

export function onlyOneChild(route) {
  return route.children && route.children.length === 1;
}

export function onlyEmptyChild(route) {
  return route.children && route.children.length === 0;
}

export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      if (!(tmp.children && tmp.children.length === 0)) {
        res.push(tmp);
      }
    }
  });

  return res;
}

export function filterSideRoutes(routes) {
  const res = [];
  for (let item of routes) {
    if (!(item.hidden && item.hidden === true)) {
      res.push(item);
    }
  }
  return res;
}

export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [],
    addRoutes: [],
    sideRoutes: [],
  }),
  getters: {
    getRoutes(state) {
      return state.routes;
    },
  },
  actions: {
    setRoutes(routes) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
      this.sideRoutes = filterSideRoutes(this.addRoutes);
    },
    generateRoutes(roles) {
      return new Promise((resolve) => {
        let accessedRoutes = [];
        // if (roles.includes('teacher')) {
        //   accessedRoutes = [
        //     ...accessedRoutes,
        //     ...filterAsyncRoutes(teacherRoutes, roles),
        //   ];
        // }
        // if (roles.includes('ta')) {
        //   accessedRoutes = [
        //     ...accessedRoutes,
        //     ...filterAsyncRoutes(taRoutes, roles),
        //   ];
        // }
        if (roles.length > 0) {
          accessedRoutes = [
            ...accessedRoutes,
            ...filterAsyncRoutes(asyncRoutes, roles),
          ];
        }
        this.setRoutes(accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
});
