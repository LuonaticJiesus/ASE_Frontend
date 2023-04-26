<template>
  <el-container>
    <el-header style="height: fit-content; padding: 2vh; margin: 0">
      <el-input
        v-model="title"
        placeholder="请输入标题（不多于50字）"
        size="large"
        style="width: 67%"
      />
      <el-input
        v-model="moduleId"
        placeholder="请输入发布的模块ID"
        size="large"
        style="width: 31%; margin-left: 1%"
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
        @upload-image="handleUploadImage"
        @save="handleSaveMdText"
        :disabled-menus="[]"
      >
      </v-md-editor>
      <vue3-tinymce
        style="width: 70vh"
        v-model="richText"
        v-if="editorType === 'rich'"
        :setting="richSetting"
      ></vue3-tinymce>
    </el-main>
    <el-footer style="height: fit-content; padding: 0 0 2px">
      <el-row
        style="border-top: solid #646cff 1px; padding: 2px"
        align="middle"
      >
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
        <el-col :offset="12" :span="1">
          <el-button class="normal-color-button" @click="handleEmitSave">
            保存
          </el-button>
        </el-col>
        <el-col :span="1" style="margin-left: 15px">
          <el-button class="normal-color-button" @click="handlePreviewMd">
            预览
          </el-button>
        </el-col>
        <el-col :span="1" style="margin-left: 15px">
          <el-button class="reverse-color-button" @click="handlePublishArticle">
            发布
          </el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import { onMounted, Ref, ref } from 'vue';
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

const richSetting = {
  language: 'zh-Hans',
  width: '70vw',
  resize: false,
  language_url:
    'https://unpkg.com/@jsdawn/vue3-tinymce@2.0.2/dist/tinymce/langs/zh-Hans.js',
  menubar: false,
  toolbar:
    'bold italic underline h1 h2 blockquote codesample numlist bullist link image | removeformat fullscreen',
  plugins: 'codesample link image table lists fullscreen',
  toolbar_mode: 'sliding',
  nonbreaking_force_tab: true,
  link_title: false,
  link_default_target: '_blank',
  content_style: 'body{font-size: 16px}',
  // 图片上传
  custom_images_upload: true,
  images_upload_url: '/dev-api/four_s/file/upload/',
  custom_images_upload_callback: (res) => res.data.url,
  custom_images_upload_header: {
    userid: useUserStore().user_id,
    token: getToken(),
  },
};
const title: Ref<string> = ref('');
const moduleId: Ref<string> = ref('');
const route = useRoute();
moduleId.value = String(route.query.moduleId);
const mdText: Ref<string> = ref('');
const richText: Ref<string> = ref(
  ' <h1>Heading</h1>\n' + '  <p>This Editor is awesome!</p>',
);
const editorType: Ref<string> = ref('md');
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

const handlePublishArticle = async () => {
  const text: string =
    editorType.value === 'md' ? mdText.value : richText.value;
  const data = {
    title: title,
    txt: text,
    block_id: moduleId.value,
  };
  console.log(text);
  publishArticle(getLocalUserId(), getToken(), data)
    .then((res) => {
      console.log('editor.vue publish success: ', res);
    })
    .catch((err) => {
      console.log('editor.vue publish failed: ', err);
    });
};

const handleUploadImage = async (event, insertImage, files) => {
  for (let file of files) {
    let formData = new FormData();
    formData.append('file', file, file.name);
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

onMounted(() => {
  // getWordCount();
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
  background-color: #646cff;
  color: white;
}
.reverse-color-button:hover {
  background-color: white;
  color: #646cff;
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
</style>
