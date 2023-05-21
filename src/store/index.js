import { createPinia } from 'pinia';

import { useUserStore } from '/@/store/module/user';
import { usePermissionStore } from '/@/store/module/permission.js';
import { useModuleStore } from '/@/store/module/module.js';

const pinia = createPinia();

export { useUserStore, usePermissionStore, useModuleStore };
export default pinia;
