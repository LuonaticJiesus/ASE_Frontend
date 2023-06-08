<template>
  <el-container>
    <el-header style="height: fit-content; padding: 2vh; margin: 0">
      <el-input
        v-model="title"
        placeholder="请输入标题（不多于50字）"
        size="large"
        maxlength="50"
        style="width: 67%; height: 90%; margin: 0; padding: 0"
      />
      <el-select-v2
        v-model="selectedModule"
        filterable
        :options="options"
        placeholder="请输入发布的模块ID"
        class="module-select-box"
      />
    </el-header>
    <el-divider style="padding: 0; margin: 0" />
    <el-main class="full-container" style="padding: 0; margin: 0; height: 50vh">
      <!--      增加属性 :disabled-menus="[]"开启图片上传-->
      <v-md-editor
        ref="mdEditor"
        v-if="editorType === 'md'"
        class="md-editor"
        v-model="mdText"
        left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code"
        :tab-size="2"
        @upload-image="handleUploadImage"
        @save="handleSaveMdText"
        :disabled-menus="[]"
      >
      </v-md-editor>
      <vue3-tinymce
        v-model="richText"
        v-if="editorType === 'rich'"
        :setting="richSetting"
        :key="tinymceFlag"
      ></vue3-tinymce>
    </el-main>
    <el-footer style="height: fit-content; padding: 0 0 2px">
      <el-row
        style="border-top: solid #bebebe 1px; padding: 2px; flex-wrap: nowrap"
        align="middle"
      >
        <el-col :span="2" style="margin-left: 15px">
          <UploadListView
            :placement="'top'"
            :get-file-url-list="getFileUrlList"
            :get-file-name-list="getFileNameList"
          ></UploadListView>
        </el-col>
        <el-col :span="2">
          <h4 class="editor-bottom-label">字符统计:</h4>
        </el-col>
        <el-col :span="1">
          <span style="color: #bebebe">
            {{
              editorType === 'md'
                ? mdText.length
                : strippedHtml(richText).length
            }}
          </span>
        </el-col>
        <el-col :span="2">
          <h4 class="editor-bottom-label">选择编辑器:</h4>
        </el-col>
        <el-col :span="3">
          <el-select v-model="editorType">
            <el-option
              v-for="item in editorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :offset="10" :span="1">
          <el-button
            class="normal-color-button"
            v-if="false"
            @click="handleEmitSave"
          >
            保存
          </el-button>
        </el-col>
        <el-col :span="1" style="margin-left: 15px">
          <el-button
            class="normal-color-button"
            v-if="false"
            @click="handlePreviewMd"
          >
            预览
          </el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="handlePublishArticle">
            发布
          </el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import { h, onActivated, onMounted, onUpdated, Ref, ref } from 'vue';
import { publishArticle } from '/@/api/article.js';
// noinspection TypeScriptCheckImport
import VMdEditor, { xss } from '@kangc/v-md-editor';
// noinspection TypeScriptCheckImport
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import { strippedHtml } from '/@/utils/string';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { useUserStore } from '/@/store';
import { uploadImage } from '/@/api/notice';
import { useRoute } from 'vue-router';
import { modulePermission } from '/@/api/module';
import router from '/@/router';
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import UploadListView from '/src/view/file/UploadListView.vue';
import { createConnect, fileBelongTo } from '/@/api/file';

const richSetting = {
  language: 'zh-Hans',
  width: '79vw',
  resize: false,
  language_url: '/tinymce/langs/zh-Hans.js',
  menubar: false,
  toolbar:
    'bold italic underline h1 h2 blockquote codesample numlist bullist emoticons link image | removeformat fullscreen',
  plugins: 'codesample link image table lists fullscreen emoticons',
  toolbar_mode: 'sliding',
  nonbreaking_force_tab: true,
  link_title: false,
  link_default_target: '_blank',
  content_style: 'body{font-size: 16px}',
  placeholder: '请输入内容',
  // 图片上传
  custom_images_upload: true,
  images_upload_url:
    import.meta.env.VITE_APP_API_BASEURL + '/four_s/file/upload/',
  custom_images_upload_callback: (res) => res.data.url,
  custom_images_upload_header: {
    userid: useUserStore().user_id,
    token: getToken(),
  },
};
const title: Ref<string> = ref('');
const moduleId: Ref<number> = ref(0);
const route = useRoute();
moduleId.value = Number(route.query.moduleId);
const mdText: Ref<string> = ref('');
const richText: Ref<string> = ref('');
const editorType: Ref<string> = ref('rich');
const editorOptions = [
  {
    value: 'rich',
    label: '富文本编辑器',
  },
  {
    value: 'md',
    label: 'Markdown编辑器',
  },
];

const tinymceFlag = ref(1);
onActivated(() => {
  tinymceFlag.value++;
});
const handlePublishArticle = async () => {
  // noinspection TypeScriptUnresolvedReference
  if (!selectedModule.value) {
    ElMessage({
      message: '还未选择模块！',
      type: 'error',
    });
    return;
  }
  const text: string =
    editorType.value === 'md'
      ? xss.process(
          VMdEditor.vMdParser.themeConfig.markdownParser.render(mdText.value),
        )
      : richText.value;
  const data = {
    title: title.value,
    txt: text,
    block_id: selectedModule.value,
  };
  console.log('editor.vue publish to', selectedModule.value);
  let uploadDone = false;
  if (!uploadDone) {
    await ElMessageBox.confirm('Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      message: h('p', null, [
        h('h4', null, '已上传以下附件，确认发布吗?'),
        h('div', [
          fileNameList.value.length > 0
            ? h(
                'ul',
                // assuming `fileNameList` is a ref with array value
                fileNameList.value.map((name) => {
                  return h('li', { key: name }, name);
                }),
              )
            : h('span', null, '无'),
        ]),
      ]),
    }).then(() => {
      uploadDone = true;
    });
  }
  if (uploadDone) {
    publishArticle(getLocalUserId(), getToken(), data)
      .then((res) => {
        console.log('editor.vue publish success: ', res);
        // 将附件和帖子绑定！
        createConnect(fileBelongTo.post, res.post_id, fileUrlList.value);
        router.push('/post/' + res.post_id);
      })
      .catch((err) => {
        console.log('editor.vue publish failed: ', err);
      });
  }
};

const handleUploadImage = async (event, insertImage, files) => {
  for (let file of files) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    const result = await uploadImage(
      useUserStore().user_id,
      getToken(),
      formData,
    );

    const url = result?.url;
    if (url) {
      console.log('Success:' + result.url);
      insertImage({
        url: url,
        desc: 'DESC',
      });
    } else {
      console.log('Failed');
    }
  }
};

const handleSaveMdText = (text, html) => {
  console.log(text);
  console.log(html);
};

const handlePreviewMd = () => {
  let text = '';
  if (editorType.value === 'md') {
    text = mdText.value;
  } else {
    text = richText.value;
  }
  console.log(text);
};

const handleEmitSave = () => {
  // noinspection TypeScriptUnresolvedReference
  const html = xss.process(
    VMdEditor.vMdParser.themeConfig.markdownParser.render(mdText.value),
  );
  console.log(html);
};

// const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const selectedModule: Ref<number | null> = ref();
const myModules = ref([]);
const options = ref([]);

const fileUrlList = ref<string[]>([]);
const fileNameList = ref<string[]>([]);
const getFileUrlList = (list) => {
  fileUrlList.value = list;
};
const getFileNameList = (list) => {
  fileNameList.value = list;
};

onMounted(async () => {
  // getWordCount();
  const res = await modulePermission(
    [0, 1, 2, 3, 4],
    getLocalUserId(),
    getToken(),
  );
  myModules.value.push(...res);
  options.value = Array.from({ length: myModules.value.length }).map(
    (_, idx) => ({
      value: Number(`${myModules.value[idx].block_id}`),
      label: `${myModules.value[idx].name}`,
    }),
  );
  selectedModule.value = null;
  const queryId = Number(router.currentRoute.value.query['moduleId']);
  //console.log('editor onMounted: ', queryId, options);
  if (queryId) {
    selectedModule.value = queryId;
  }
});

onUpdated(async () => {
  selectedModule.value = null;
  const queryId = Number(router.currentRoute.value.query['moduleId']);
  //console.log('editor onUpdate: ', queryId, options);
  if (queryId) {
    selectedModule.value = queryId;
  }
});
</script>

<script lang="ts">
export default {
  name: 'PostEditor',
};
</script>

<style scoped>
.md-editor {
  width: 100%;
}
.reverse-color-button {
  background-image: linear-gradient(
    90deg,
    #8224e3 0,
    #a968ec 50%,
    #8224e3 100%
  );
  color: white;
}
.reverse-color-button:hover {
  background-image: linear-gradient(
    90deg,
    #8224e3 100%,
    #a968ec 50%,
    #8224e3 0
  );
  color: white;
}
.normal-color-button {
  background-color: white;
  color: #646cff;
}
.normal-color-button:hover {
  background-color: #646cff;
  color: white;
}
.editor-bottom-label {
  margin: 0;
  text-align: center;
}
.module-select-box {
  width: 31%;
  height: 90%;
  margin: 0 0 0 1%;
}
.module-select-box:deep(.el-select-v2__wrapper) {
  height: 100%;
}

.el-input {
  --el-input-focus-border-color: #9007ff;
}

.el-select-v2 {
  --el-select-input-focus-border-color: #9007ff;
}
</style>
