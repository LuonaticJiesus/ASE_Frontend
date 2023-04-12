import { createApp } from 'vue';
import '/@/style/style.css';
import router from '/@/router/index';
import piniaStore from '/@/store/index';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import App from '/@/App.vue';

VMdEditor.use(vuepressTheme);

const app = createApp(App);
app.use(router);
app.use(piniaStore);
app.use(VMdEditor);
app.mount('#app');
