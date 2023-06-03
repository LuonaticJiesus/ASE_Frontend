import { createApp } from 'vue';
import router from '/@/router/index';
import piniaStore from '/@/store/index';
import 'nprogress/nprogress.css';
import '/@/style/style.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';

import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import hljs from 'highlight.js';

import App from '/@/App.vue';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);
app.use(router);
app.use(piniaStore);
app.use(VMdEditor);
app.use(VMdPreview);
app.use(VMdPreviewHtml);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

app.mount('#app');
