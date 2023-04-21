import { get, post } from '/@/utils/request';

const URL = {
  login: '/four_s/user/login/',
  logout: '/four_s/user/logout/',
  signup: '/four_s/user/signup/',
  profile: '/back/user/profile',
};

const getUserProfile = async () => get({ url: URL.profile });
const login = async (data) =>
  post({
    url: URL.login,
    data,
  });
const logout = async () => post({ url: URL.logout });
export { getUserProfile, logout, login };
