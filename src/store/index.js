import { createPinia } from 'pinia';

import { useUserStore } from '/@/store/module/user';
import { usePermissionStore } from '/@/store/module/permission.js';
import { useModuleStore } from '/@/store/module/module.js';
import { useCommentStore } from '/@/store/module/comment.js';

const pinia = createPinia();

export { useUserStore, usePermissionStore, useModuleStore, useCommentStore };
export default pinia;
