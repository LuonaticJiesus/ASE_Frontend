/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import { setToken, clearToken } from '/@/utils/auth';
import { login, logout, getUserProfile } from '/@/api/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    user_id: undefined,
    user_name: undefined,
    favor_count: undefined,
    roles: [],
  }),
  getters: {
    userProfile(state) {
      return { ...state };
    },
    userRoles(state) {
      return state.roles;
    },
  },
  actions: {
    // 设置用户信息
    setInfo(partial) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    async getInfo() {
      const result = await getUserProfile;
      this.setInfo(result);
    },
    // 异步登录并存储token
    async login(loginForm) {
      const result = await login(loginForm);
      const token = result?.token;
      if (token) {
        setToken(token);
      }
      return result;
    },
    // Logout
    async logout() {
      await logout();
      this.resetInfo();
      clearToken();
      // 路由表重置
      // location.reload();
    },
  },
});
