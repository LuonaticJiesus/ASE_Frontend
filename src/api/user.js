// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { post, get } from '/@/utils/request';

const URL = {
  login: '/four_s/user/login/',
  logout: '/four_s/user/logout/',
  signup: '/four_s/user/signup/',
  profile: '/four_s/user/myInfo/',
  changePwd: '/four_s/user/changePwd/',
  changeInfo: '/four_s/user/modify/',
  info: '/four_s/user/info/',
  querySubscribe: '/four_s/user/querySubscribe/', // 废弃
  validate: '/four_s/user/active/',
  publicKey: '/four_s/user/publicKey/',
  testEncode: '/four_s/user/password/',
};

const getPublicKey = async () =>
  get({
    url: URL.publicKey,
  });

const testEncode = async (data) =>
  post({
    url: URL.testEncode,
    data: {
      password: data,
    },
  });

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
const changePwd = async (oldPwd, newPwd, userId, token) =>
  post({
    url: URL.changePwd,
    headers: {
      userid: userId,
      token: token,
    },
    data: {
      old_password: oldPwd,
      password: newPwd,
    },
  });
const logout = async () => post({ url: URL.logout });
const signup = async (data) =>
  post({
    url: URL.signup,
    data,
  });

const fetchInfo = async (headers, data) =>
  post({ url: URL.info, headers: headers, data });

const querySubscribe = async (userid, token, user_id) =>
  get({
    url: URL.querySubscribe,
    headers: {
      userid: userid,
      token: token,
    },
    params: {
      user_id: user_id,
    },
  });
const validateAccount = async (params) => get({ url: URL.validate, params });

export {
  getUserProfile,
  logout,
  login,
  signup,
  changePwd,
  changeBasicInfo,
  fetchInfo,
  querySubscribe,
  validateAccount,
  getPublicKey,
  testEncode,
};
