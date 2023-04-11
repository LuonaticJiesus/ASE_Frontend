import { createPinia } from 'pinia';

import { useUserStore } from '/@/store/module/user';

const pinia = createPinia();

export { useUserStore };
export default pinia;
