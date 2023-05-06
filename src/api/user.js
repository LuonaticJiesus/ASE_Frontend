// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { post } from '/@/utils/request';

const URL = {
  login: '/four_s/user/login/',
  logout: '/four_s/user/logout/',
  signup: '/four_s/user/signup/',
  profile: '/four_s/user/myInfo/',
  changePwd: '/four_s/user/changePwd/',
  changeInfo: '/four_s/user/modify/',
};

const getUserProfile = async (header) =>
  post({ url: URL.profile, headers: header });
const login = async (data) =>
  post({
    url: URL.login,
    data,
  });
// 更改用户基本信息
const changeBasicInfo = async (data, headerData) =>
  post({ url: URL.changeInfo, headers: headerData, data });
// 更改用户密码
const changePwd = async (data, headerData) => {
  post({ url: URL.changePwd, headers: headerData, data });
  console.log('post!!!');
};
const logout = async () => post({ url: URL.logout });
const signup = async (data) =>
  post({
    url: URL.signup,
    data,
  });

export { getUserProfile, logout, login, signup, changePwd, changeBasicInfo };
