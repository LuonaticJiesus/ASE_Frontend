import { defineStore } from 'pinia';
import {
  constantRoutes,
  userRoutes,
  taRoutes,
  teacherRoutes,
} from '/@/router/routes.js';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: constantRoutes,
    addRoutes: [],
  }),
  getters: {},
  actions: {
    setRoutes(routes) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
    generateRoutes(roles) {
      return new Promise((resolve) => {
        let accessedRoutes = [];
        if (roles.includes('teacher')) {
          accessedRoutes = [...accessedRoutes, ...teacherRoutes];
        }
        if (roles.includes('ta')) {
          accessedRoutes = [...accessedRoutes, ...taRoutes];
        }
        if (roles.includes('user')) {
          accessedRoutes = [...accessedRoutes, ...userRoutes];
        }
        this.setRoutes(accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
});
