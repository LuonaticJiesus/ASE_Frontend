import { post } from '/@/utils/request';

const URL = {
  login: '/four_s/user/login/',
  logout: '/four_s/user/logout/',
  signup: '/four_s/user/signup/',
  profile: '/four_s/user/info',
};

const getUserProfile = async (data) => post({ url: URL.profile, data });
const login = async (data) =>
  post({
    url: URL.login,
    data,
  });
const logout = async () => post({ url: URL.logout });
const signup = async (data) =>
  post({
    url: URL.signup,
    data,
  });
export { getUserProfile, logout, login, signup };
