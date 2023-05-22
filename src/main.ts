import { createApp } from 'vue';
import router from '/@/router/index';
import piniaStore from '/@/store/index';
import '/@/style/style.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import App from '/@/App.vue';

VMdEditor.use(githubTheme);

const app = createApp(App);
app.use(router);
app.use(piniaStore);
app.use(VMdEditor);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

app.mount('#app');
