import { useUserStore } from '/@/store';
import { ElNotification } from 'element-plus';
import 'element-plus/theme-chalk/el-notification.css';

export const redirectToLogin = async () => {
  await useUserStore().logout();
  ElNotification.error({
    title: '登陆已过期，请重新登录',
  });
};
