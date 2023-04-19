<template>
  <el-dialog
    :model-value="visible"
    destroy-on-close
    modal
    :show-close="false"
    style="border-radius: 12px"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass" style="margin: 0">发布通知</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          关闭
        </el-button>
      </div>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="通知标题:" required>
          <el-input placeholder="请输入标题"> </el-input>
        </el-form-item>
        <el-form-item label="通知内容:" required>
          <vue3-tinymce v-model="content" :setting="richSetting">
          </vue3-tinymce>
        </el-form-item>
        <el-form-item label="截止时间:">
          <el-date-picker
            v-model="ddl"
            type="datetime"
            placeholder="Select date and time"
            :shortcuts="shortcuts"
          />
        </el-form-item>
        <el-row style="justify-content: right">
          <el-button type="primary"> 确认发布 </el-button>
        </el-row>
      </el-form>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
/* eslint-disable camelcase */
import { CircleCloseFilled } from '@element-plus/icons-vue';

// noinspection TypeScriptCheckImport
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import { ref } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

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
};

const content = '请输入内容';

const ddl = ref('');

const shortcuts = [
  {
    text: '明天',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: '下一周',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
      return date;
    },
  },
  {
    text: '下两周',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 14);
      return date;
    },
  },
];
</script>

<script lang="ts">
export default {
  name: 'NoticeEditor',
};
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>