import { createPinia } from 'pinia';

import { useUserStore } from '/@/store/module/user';
import { usePermissionStore } from '/@/store/module/permission.js';

const pinia = createPinia();

export { useUserStore, usePermissionStore };
export default pinia;
