<template>
  <DivideContainer>
    <template #main>
      <div style="margin: 10px 20px">
        <el-row style="display: flex; justify-content: left">
          <h2 style="margin-bottom: 0">
            {{ notice.title }}
          </h2>
        </el-row>
        <el-divider></el-divider>
        <el-row style="margin: 0px 0 10px">
          <el-col :span="12">
            <el-row>
              <h4 style="margin: 0">所属模块:</h4>
              <el-text
                style="
                  margin: 0;
                  padding-left: 10px;
                  color: #bebebe;
                  text-align: left;
                "
              >
                {{ moduleName }}
              </el-text>
            </el-row>
          </el-col>
        </el-row>
        <el-row align="middle" style="margin: 10px 0 10px">
          <el-col :span="6">
            <el-row justify="start" align="middle">
              <h4 style="margin: 0 10px 0 0">发布者:</h4>
              <el-avatar :src="creatorAvatar"> </el-avatar>
              <el-text style="margin: 0 0 0 10px; color: #bebebe">
                {{ creatorName }}
              </el-text>
            </el-row>
          </el-col>
          <el-col :span="9" :offset="4">
            <el-row justify="start" align="middle">
              <h4 style="margin: 0 10px 0 0">发布时间:</h4>
              <!--              <el-date-picker-->
              <!--                v-model="notice.time"-->
              <!--                type="datetime"-->
              <!--                readonly-->
              <!--                style="width: auto"-->
              <!--              >-->
              <!--              </el-date-picker>-->
              <el-text style="color: #bebebe">{{
                new Date(notice.time).toLocaleDateString()
              }}</el-text>
              <!--              <h4 style="margin: 0; color: #bebebe">{{ notice.time }}</h4>-->
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="showDownloadList = true">
            <el-icon><Link /></el-icon>
            <el-text>附件列表</el-text>
          </el-button>
        </el-row>
        <el-row style="margin: 10px 0 10px">
          <h4 style="margin: 0">通知正文:</h4>
        </el-row>
        <el-row>
          <vue3-tinymce
            style="width: auto"
            v-model="notice.txt"
            :setting="richSetting"
          ></vue3-tinymce>
        </el-row>
        <el-dialog
          v-model="showDownloadList"
          @close="showDownloadList = false"
          title="附件列表"
          width="780px"
          style="border-radius: 12px"
        >
          <div style="width: 100%; margin: 10px">
            <DownloadListView
              :belong-to-id="Number(notice_id)"
              :file-type="'notice'"
            />
          </div>
        </el-dialog>
      </div>
    </template>
    <template #right>
      <div style="height: 87vh">
        <el-row justify="space-around" align="middle" style="margin-top: 10px">
          <el-col :span="6">
            <h4 style="margin: 0">截止时间:</h4>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="ddl"
              type="datetime"
              readonly
              style="width: auto"
            >
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-calendar>
            <template #date-cell="{ data }">
              <div class="calendar-day">
                <p
                  :class="
                    isDDL(data.day)
                      ? 'is-ddl'
                      : isToday(data.day)
                      ? 'is-today'
                      : ''
                  "
                >
                  {{ data.day.split('-').slice(2).join('-') }}
                </p>
              </div>
            </template>
          </el-calendar>
        </el-row>
        <el-row justify="space-around" align="middle" style="margin-top: 10px">
          <el-col :span="6">
            <h4 style="margin: 0">
              {{ isConfirmed ? '已确认:' : '完成确认:' }}
            </h4>
          </el-col>
          <el-col :span="16">
            <el-tooltip :content="isConfirmed ? '取消确认' : '还未确认'">
              <el-button
                @click="handleChangeConfirm"
                :plain="!isConfirmed"
                type="primary"
              >
                <el-icon><check></check></el-icon
              ></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </template>
  </DivideContainer>
</template>

<script setup>
/* eslint-disable camelcase */
import { Check, Link } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import router from '/@/router/index.js';
// noinspection TypeScriptCheckImport
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import { defaultLogo } from '/@/utils/string.ts';
import { changeNoticeConfirm, queryNoticeById } from '/@/api/notice.js';
import { getLocalUserId, getToken } from '/@/utils/auth.ts';
import { fetchInfo } from '/@/api/user.js';
import { moduleInfo } from '/@/api/module.js';
import { ElMessageBox, ElNotification } from 'element-plus';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-notification.css';
import DownloadListView from '/@/view/file/DownloadListView.vue';
// noinspection JSUnresolvedReference
import { xss } from '@kangc/v-md-editor';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  notice_id: {
    type: Number,
    default: 0,
  },
});

const richSetting = {
  language: 'zh-Hans',
  width: '60vw',
  height: '48vh',
  resize: false,
  language_url:
    'https://unpkg.com/@jsdawn/vue3-tinymce@2.0.2/dist/tinymce/langs/zh-Hans.js',
  menubar: false,
  toolbar: false,
  plugins: 'codesample link image table lists',
  nonbreaking_force_tab: true,
  link_title: false,
  link_default_target: '_blank',
  content_style: 'body{font-size: 16px}',
  readonly: true,
};

const showDownloadList = ref(false);

const ddl = ref(new Date('2023-4-19'));
const isDDL = (day) => {
  const date = new Date(day);
  return date.toDateString() === ddl.value.toDateString();
};

const today = ref(new Date());
const isToday = (day) => {
  const date = new Date(day);
  return date.toDateString() === today.value.toDateString();
};

const creatorName = ref('');
const creatorAvatar = ref('');
const moduleName = ref('');

const notice = ref({
  notice_id: Number,
  title: String,
  txt: String,
  user_id: Number,
  block_id: Number,
  time: String,
  ddl: String,
  confirm_state: Number,
});

const saveTxt = ref('');
const notice_id = router.currentRoute.value.params['id'];
const headers = { token: getToken(), userid: getLocalUserId() };
const isConfirmed = ref(false);
const fetchData = async () => {
  const params = { notice_id: notice_id };
  const result = await queryNoticeById(headers, params);
  if (result && result.length > 0) {
    notice.value = result[0];
    ddl.value = new Date(notice.value.ddl);
    isConfirmed.value = notice.value.confirm_state === 1;
    saveTxt.value = xss.process(notice.value.txt);
  }
};

const handleChangeConfirm = async () => {
  if (isConfirmed.value) {
    await ElMessageBox.confirm('通知已确认，确定取消吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
  }

  const data = {
    notice_id: notice_id,
  };
  await changeNoticeConfirm(headers, data);
  isConfirmed.value = !isConfirmed.value;
  if (isConfirmed.value) {
    ElNotification({
      title: '确认成功',
    });
  } else {
    ElNotification({
      title: '取消成功',
    });
  }
};

const fetchCreator = async (user_id) => {
  const headers = { token: getToken(), userid: getLocalUserId() };
  const result = await fetchInfo(headers, { user_id: user_id });
  creatorName.value = result.name;
  creatorAvatar.value = result.avatar;
  if (creatorAvatar.value === '' || creatorAvatar.value === undefined) {
    creatorAvatar.value = defaultLogo;
  }
};

const fetchModule = async (module_id) => {
  const result = await moduleInfo(module_id, getLocalUserId(), getToken());
  moduleName.value = result.name;
};

onMounted(async () => {
  let notice_id = router.currentRoute.value.params;
  await fetchData();
  await fetchCreator(notice.value.user_id);
  await fetchModule(notice.value.block_id);
  console.log(notice);
});
</script>

<script>
import DivideContainer from '/@/layout/components/DivideContainer.vue';

export default {
  name: 'NoticePreview',
  components: { DivideContainer },
};
</script>

<style>
.is-ddl {
  color: red;
}
.is-today {
}
.el-calendar-table__row .current .calendar-day {
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 14px;
  font-weight: 700;
}
.el-calendar-table__row .prev .calendar-day,
.el-calendar-table__row .next .calendar-day {
  text-align: center;
  /* color: #202535; */
  line-height: 30px;
  font-size: 14px;
  font-weight: 700;
}
.el-calendar-table .el-calendar-day {
  padding: 1px;
  height: auto;
}
.el-calendar__title {
  font-size: smaller;
}
</style>
