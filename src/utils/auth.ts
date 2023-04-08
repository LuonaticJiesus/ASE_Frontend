const TokenKey = 'Token';
const TokenPrefix = 'Luojie ';
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
export { TokenPrefix, isLogin, getToken, setToken, clearToken };
