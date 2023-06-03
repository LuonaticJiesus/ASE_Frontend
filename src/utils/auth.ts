const TokenKey = 'Token';
const TokenPrefix = 'Luojie ';

const UserId = 'userid';

const isLogin = () => {
  return !!localStorage.getItem(TokenKey);
};
const getToken = () => {
  return localStorage.getItem(TokenKey);
};
const setToken = (token: string) => {
  localStorage.setItem(TokenKey, token);
};
const clearToken = () => {
  localStorage.removeItem(TokenKey);
};

const getLocalUserId = () => {
  return localStorage.getItem(UserId);
};

const setLocalUserId = (id: string) => {
  localStorage.setItem(UserId, id);
};
const clearUserId = () => {
  localStorage.removeItem(UserId);
};

export {
  TokenPrefix,
  isLogin,
  getToken,
  setToken,
  clearToken,
  getLocalUserId,
  setLocalUserId,
  clearUserId,
};
