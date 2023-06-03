<template>
  <el-dialog
    :model-value="visible"
    :show-close="false"
    style="border-radius: 12px; z-index: -1"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass" style="margin: 0">发布通知</h4>
        <el-button type="danger" @click="closeDialog()">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          关闭
        </el-button>
      </div>
    </template>
    <template #default>
      <el-form ref="noticeFormRef" :model="noticeForm">
        <el-form-item label="通知标题:" required prop="title">
          <el-input v-model="noticeForm.title" placeholder="请输入标题">
          </el-input>
        </el-form-item>
        <el-form-item label="通知内容:" required prop="content">
          <vue3-tinymce
            v-loading="true"
            v-model="noticeForm.content"
            :setting="richSetting"
          >
          </vue3-tinymce>
        </el-form-item>
        <el-form-item label="截止时间:" prop="ddl">
          <el-date-picker
            v-model="noticeForm.ddl"
            type="datetime"
            format="YYYY-MM-DD hh:mm:ss"
            value-format="YYYY-MM-DD hh:mm:ss"
            placeholder="请选择截止时间"
            :shortcuts="shortcuts"
          />
        </el-form-item>
        <el-row style="justify-content: right">
          <el-button type="primary" @click="postNotice()"> 确认发布 </el-button>
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
import { reactive, ref } from 'vue';
import { publishNotice } from '/@/api/notice';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { ElMessage, ElNotification, FormInstance } from 'element-plus';
import router from '/@/router';

const noticeFormRef = ref<FormInstance>();

const noticeForm = reactive({
  title: '',
  content: '',
  ddl: '',
});

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
  placeholder: '请输入内容',
  nonbreaking_force_tab: true,
  link_title: false,
  link_default_target: '_blank',
  content_style: 'body{font-size: 16px}',
};

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

const postNotice = async () => {
  if (
    noticeForm.ddl === '' ||
    noticeForm.content === '' ||
    noticeForm.title === ''
  ) {
    console.log('NoticeEditor empty');
    ElNotification({
      message: '存在为空内容，请将通知填写完成',
      type: 'error',
    });
  } else if (new Date(noticeForm.ddl) < new Date()) {
    console.log('NoticeEditor too early');
    ElNotification({
      message: '所选ddl早于当前时间，请重新选择',
      type: 'error',
    });
  } else {
    const header = {
      userid: getLocalUserId(),
      token: getToken(),
    };
    const data = {
      title: noticeForm.title,
      txt: noticeForm.content,
      block_id: router.currentRoute.value.params['id'],
      ddl: noticeForm.ddl,
    };
    await publishNotice(header, data);
    ElMessage.success({
      showClose: true,
      duration: 2000,
      message: '发布通知成功!',
    });
    cleanForm();
    closeDialog();
  }
};

const cleanForm = () => {
  noticeFormRef.value.resetFields();
  console.log('clean notice form');
};

const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('closeDialog');
};
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
.tox-tinymce-aux {
  z-index: 9999 !important;
}
</style>
