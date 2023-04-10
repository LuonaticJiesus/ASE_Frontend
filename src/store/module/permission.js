import { defineStore } from 'pinia';
import {
  constantRoutes,
  userRoutes,
  taRoutes,
  teacherRoutes,
} from '/@/router/routes.js';

export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

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
    },
    generateRoutes(roles) {
      return new Promise((resolve) => {
        let accessedRoutes = [];
        if (roles.includes('teacher')) {
          accessedRoutes = [
            ...accessedRoutes,
            ...filterAsyncRoutes(teacherRoutes, roles),
          ];
        }
        if (roles.includes('ta')) {
          accessedRoutes = [
            ...accessedRoutes,
            ...filterAsyncRoutes(taRoutes, roles),
          ];
        }
        if (roles.includes('user')) {
          accessedRoutes = [
            ...accessedRoutes,
            ...filterAsyncRoutes(userRoutes, roles),
          ];
        }
        this.setRoutes(accessedRoutes);
        console.log(filterAsyncRoutes(userRoutes, roles));
        resolve(accessedRoutes);
      });
    },
  },
});
