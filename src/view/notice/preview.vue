<template>
  <DivideContainer>
    <template #main>
      <div style="margin: 10px 20px">
        <el-row style="display: flex; justify-content: left">
          <h2>{{ notice.title }}</h2>
        </el-row>
        <el-row style="margin: 10px 0 10px">
          <el-col :span="3">
            <el-row justify="space-between">
              <h4 style="margin: 0">所属模块:</h4>
              <h4 style="margin: 0; padding-left: 5px; color: #bebebe">
                {{ moduleName }}
              </h4>
            </el-row>
          </el-col>
        </el-row>
        <el-row align="middle" style="margin: 10px 0 10px">
          <el-col :span="4">
            <el-row justify="space-between" align="middle">
              <h4 style="margin: 0">发布者:</h4>
              <el-avatar :src="creatorAvatar"> </el-avatar>
              <h4 style="margin: 0; color: #bebebe">{{ creatorName }}</h4>
            </el-row>
          </el-col>
          <el-col :span="7" :offset="2">
            <el-row justify="space-between" align="middle">
              <h4 style="margin: 0">发布时间:</h4>
              <h4 style="margin: 0; color: #bebebe">{{ notice.time }}</h4>
            </el-row>
          </el-col>
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
      </div>
    </template>
    <template #right>
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
          <h4 style="margin: 0">完成确认:</h4>
        </el-col>
        <el-col :span="16">
          <el-button>
            <el-icon><check></check></el-icon
          ></el-button>
        </el-col>
      </el-row>
    </template>
  </DivideContainer>
</template>

<script setup>
/* eslint-disable camelcase */
import { Check } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import router from '/@/router/index.js';
// noinspection TypeScriptCheckImport
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import { defaultLogo } from '/@/utils/string.ts';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  notice_id: {
    type: Number,
    default: 0,
  },
});

const richSetting = {
  language: 'zh-Hans',
  width: '70vw',
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
});

const fetchData = async (notice_id) => {
  notice.value = {
    title: '标题',
    txt:
      '<h1>Heading</h1>\n' +
      '  <p>This Editor is awesome!</p>' +
      '<h1>Heading</h1>\n' +
      '<h1>Heading</h1>\n' +
      '<h1>Heading</h1>\n',
    user_id: 1,
    block_id: 1,
    time: '2014-03-20 13:28:32',
    ddl: '2023-04-19 21:15:29',
  };
  ddl.value = new Date(notice.value.ddl);
  return 1;
};

const fetchCreator = async (user_id) => {
  const result = {
    username: 'CCC',
    avatar_url: defaultLogo,
  };
  creatorName.value = result.username;
  creatorAvatar.value = result.avatar_url;
};

const fetchModule = async (module_id) => {
  const result = {
    name: 'BBB',
  };
  moduleName.value = result.name;
};

onMounted(async () => {
  let notice_id = router.currentRoute.value.params;
  await fetchData(notice_id);
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
