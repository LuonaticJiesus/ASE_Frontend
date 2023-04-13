import { get, post } from '/@/utils/request';

const URL = {
  login: '/back/user/login',
  logout: '/back/user/logout',
  profile: '/back/user/profile',
};

const getUserProfile = async () => get({ url: URL.profile });
const login = async (data) => post({ url: URL.login, data });
const logout = async () => post({ url: URL.logout });
export { getUserProfile, logout, login };
