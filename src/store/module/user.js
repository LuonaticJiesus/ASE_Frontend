/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import { setToken, clearToken } from '/@/utils/auth';
import { login, logout, getUserProfile } from '/@/api/user';
// eslint-disable-next-line no-unused-vars
import { status } from 'nprogress';
import { state } from 'vue-tsc/out/shared.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    userid: undefined,
    username: undefined,
    favor_count: undefined,
    status: false, // 判断是否登录，登录为true，没登录false
    roles: [], // 开发环境使用，暂时认为已登录
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
    //设置是否登录信息
    setLoginStatus(status) {
      state.status = status;
    },
    setUserId(id) {
      state.userid = id;
    },
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
      const user_id = result?.user_id;
      if (token) {
        setToken(token);
        console.log('login success: ', result);
        this.setLoginStatus(true); // 更新登录状态
        console.log('update status: ', state);
        this.setUserId(user_id);
        console.log('update id: ', state);
      } else {
        console.log('login fail: ', result);
      }
      return result;
    },
    // Logout
    async logout() {
      await logout();
      this.resetInfo();
      clearToken();
      this.setLoginStatus(false);
      // 路由表重置
      // location.reload();
    },
  },
});
