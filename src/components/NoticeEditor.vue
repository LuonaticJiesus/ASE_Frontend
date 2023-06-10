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
            :key="tinymceFlag"
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
        <el-row style="justify-content: space-between; flex-wrap: nowrap">
          <el-col :span="3">
            <UploadListView
              :placement="'top'"
              :get-file-url-list="getFileUrlList"
              :get-file-name-list="getFileNameList"
            ></UploadListView>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="postNotice()">
              确认发布
            </el-button>
          </el-col>
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
import { h, onActivated, reactive, ref } from 'vue';
import { publishNotice } from '/@/api/notice';
import { getLocalUserId, getToken } from '/@/utils/auth';
import {
  ElMessage,
  ElMessageBox,
  ElNotification,
  FormInstance,
} from 'element-plus';
import router from '/@/router';
import UploadListView from '/@/view/file/UploadListView.vue';
import { createConnect, fileBelongTo } from '/@/api/file';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-notification.css';
// noinspection TypeScriptCheckImport
import { xss } from '@kangc/v-md-editor';

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

const fileUrlList = ref<string[]>([]);
const fileNameList = ref<string[]>([]);
const getFileUrlList = (list) => {
  fileUrlList.value = list;
};
const getFileNameList = (list) => {
  fileNameList.value = list;
};

const richSetting = {
  language: 'zh-Hans',
  width: '70vw',
  resize: false,
  language_url: '/tinymce/langs/zh-Hans.js',
  menubar: false,
  toolbar:
    'bold italic underline h1 h2 blockquote codesample numlist bullist emoticons link image | removeformat fullscreen',
  plugins: 'codesample link image table lists fullscreen emoticons',
  toolbar_mode: 'sliding',
  placeholder: '请输入内容',
  nonbreaking_force_tab: true,
  link_title: false,
  link_default_target: '_blank',
  content_style: 'body{font-size: 16px}',
};

const tinymceFlag = ref(1);
onActivated(() => {
  tinymceFlag.value++;
});

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
      txt: xss.process(noticeForm.content),
      block_id: router.currentRoute.value.params['id'],
      ddl: noticeForm.ddl,
    };
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
      await publishNotice(header, data).then((res) => {
        // 将附件和帖子绑定！
        createConnect(fileBelongTo.notice, res.notice_id, fileUrlList.value);
      });
    }

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
