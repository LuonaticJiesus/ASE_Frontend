import { get, post } from '/@/utils/request';

const URL = {
  login: '/back/user/login',
  logout: '/back/user/logout',
  profile: '/back/user/profile',
};

const getUserProfile = async () => get({ url: URL.profile });
const login = async (data) =>
  post({
    url: 'http://127.0.0.1:4523/m1/2544583-0-default/four_s/user/login/',
    data,
  });
const logout = async () => post({ url: URL.logout });
export { getUserProfile, logout, login };
