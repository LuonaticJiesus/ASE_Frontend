/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import {
  setToken,
  clearToken,
  getToken,
  setUserId,
  getLocalUserId,
  clearUserId,
} from '/@/utils/auth';
import { login, getUserProfile, signup } from '/@/api/user';
import { defaultLogo } from '/@/utils/string.ts';
//import { state } from 'vue-tsc/out/shared.js';
// eslint-disable-next-line no-unused-vars

export const useUserStore = defineStore('user', {
  state: () => ({
    user_id: getLocalUserId(),
    name: undefined,
    card_id: undefined,
    phone: undefined,
    email: undefined,
    avatar: defaultLogo,
    point: undefined,
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
    getUserId() {
      return this.user_id;
    },
    getUsername() {
      return this.username;
    },
    //设置是否登录信息
    setLoginStatus(status) {
      this.status = status;
    },
    setUserId(id) {
      setUserId(id);
      this.$patch({ user_id: id });
    },
    setUsername(username) {
      this.username = username;
    },
    // 设置用户信息
    setInfo(partial) {
      this.$patch({ status: true });
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    async getInfo() {
      const result = await getUserProfile({
        userid: getLocalUserId(),
        token: getToken(),
      });
      this.setInfo(result);
    },
    // 异步登录并存储token
    async login(loginForm) {
      const result = await login(loginForm);
      const token = result?.token;
      const user_id = result?.userid;
      if (token) {
        setToken(token);
        console.log('login success: ', result);
        this.setLoginStatus(true); // 更新登录状态
        this.setUserId(user_id);
        this.setUsername(loginForm.username);
      } else {
        console.log('login fail: ', result);
      }
      return result;
    },
    // Register
    async register(registerForm) {
      await signup(registerForm);
      return 1;
    },
    // Logout
    async logout() {
      // await logout();
      this.resetInfo();
      clearToken();
      clearUserId();
      this.setLoginStatus(false);
      // 路由表重置
      location.reload();
    },
  },
});
