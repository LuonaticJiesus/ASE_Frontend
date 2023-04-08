import { createPinia } from 'pinia';

import { useUserStore } from '/@/utils/modules/user.js';

const pinia = createPinia();

export { useUserStore };
export default pinia;
