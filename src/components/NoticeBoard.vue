<template>
  <div class="right-board">
    <el-row justify="space-between">
      <el-col :span="12">
        <h3 class="right-board-title">通知版</h3>
      </el-col>
      <el-col :span="8">
        <el-button v-show="postNoticePermission" @click="showNoticeEditor"
          >发布通知</el-button
        >
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-tabs style="width: 90%">
        <el-tab-pane label="未确认" class="notice-tab">
          <el-empty
            v-if="unConfirmedNotices.length === 0"
            description="当前没有未确认的通知"
          />
          <el-scrollbar>
            <NoticeSimple
              v-for="notice of unEndedNotices"
              :key="notice"
              :noticeItem="notice"
            ></NoticeSimple>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="未截止" class="notice-tab">
          <el-empty
            v-if="unEndedNotices.length === 0 || !readNoticePermission"
            :description="
              readNoticePermission
                ? '当前没有未截止的通知'
                : '订阅之后才能查看通知'
            "
          />
          <el-scrollbar>
            <NoticeSimple
              v-for="notice of unEndedNotices"
              :key="notice"
              :noticeItem="notice"
            ></NoticeSimple>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="所有" class="notice-tab">
          <el-empty
            v-if="allNotices.length === 0 || !readNoticePermission"
            :description="
              readNoticePermission ? '当前没有通知' : '订阅之后才能查看通知'
            "
          />
          <el-scrollbar>
            <NoticeSimple
              v-for="notice of allNotices"
              :key="notice"
              :noticeItem="notice"
            ></NoticeSimple>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <NoticeEditor
      v-if="postNoticePermission"
      v-model:visible="dialogEditor"
      @closeDialog="closeNoticeEditor"
    ></NoticeEditor>
  </div>
</template>

<script>
export default {
  name: 'NoticeBoard',
};
</script>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { moduleNotices } from '/@/api/notice.js';
import NoticeSimple from '/@/components/NoticeSimple.vue';
import NoticeEditor from '/@/components/NoticeEditor.vue';
import router from '/@/router/index.js';
import { queryRole } from '/@/api/permission.js';
import { getLocalUserId, getToken } from '/@/utils/auth.ts';
let unEndedNotices = ref([]);
let allNotices = ref([]);
let unConfirmedNotices = ref([]);
const updateNoticeList = async () => {
  const block_id = router.currentRoute.value.params['id'];
  let list = [];
  if (block_id) {
    console.log(block_id);
    list = await moduleNotices(block_id, getLocalUserId(), getToken());
  }
  // 根据截止时间分成两个array
  allNotices.value = list;
  const undue = [];
  const unConfirmed = [];
  // 均为毫秒时间戳
  const time = new Date().getTime();
  for (let item of list) {
    const ddl = new Date(item.ddl).getTime();
    if (ddl > time) {
      undue.push(item);
      if (item.confirm_state === 0) {
        unConfirmed.push(item);
      }
    }
  }
  unEndedNotices.value = undue;
  unConfirmedNotices.value = unConfirmed;
};

const dialogEditor = ref(false);
const showNoticeEditor = () => {
  dialogEditor.value = true;
  console.log('showNoticeEditor');
};

const closeNoticeEditor = () => {
  dialogEditor.value = false;
  console.log('closeNoticeEditor');
};

const postNoticePermission = ref(false);
const readNoticePermission = ref(false);

const checkPermission = async () => {
  const block_id = router.currentRoute.value.params['id'];
  if (block_id) {
    const role = await queryRole(block_id);
    console.log('current role is ' + role);
    readNoticePermission.value = role > -1;
    postNoticePermission.value = role > 1;
  }
};

onMounted(async () => {
  await checkPermission();
  await updateNoticeList();
});

// 目的是切换module时右侧通知版同步刷新
// 尝试使用onBeforeUpdate/onBeforeRouteUpdate/onBeforeRouteLeave等钩子均无效
// NoticeBoard始终只有一个实例，暂时只能通过监听路由的方式实现（当然可以全局状态管理，略麻烦）
// 欢迎尝试新的做法！
watch(
  () => router.currentRoute.value.params['id'],
  async () => {
    const route = router.currentRoute.value;
    if (
      route.params['id'] &&
      route.matched.length > 2 &&
      route.matched[1].path === '/module'
    ) {
      await checkPermission();
      await updateNoticeList();
    }
  },
);
</script>

<style scoped>
.right-board {
  margin: 10px;
  padding: 5px;
  border: 2px solid #e7e7e7;
  border-radius: 12px;
  height: 55vh;
  box-shadow: rgba(58, 46, 68, 0.08) 0 15px 100px 0;
  background-image: linear-gradient(
    #ffffff 0%,
    rgba(234, 220, 253, 50) 100%,
    rgba(184, 134, 248, 21) 120%
  );
  display: flex;
  flex-direction: column;
}

.right-board-title {
  margin: 0;
  text-align: left;
}

.right-board-title::after {
  content: '';
  width: 40px;
  height: 2px;
  position: absolute;
  top: 28px;
  left: 2px;
  background-color: #535bf2;
  box-sizing: border-box;
}

.notice-tab {
  height: 40vh;
}

.el-card:deep(.el-card__body) {
  padding: 10px 0 10px;
}

.el-tabs:deep(.el-tabs__item.is-active) {
  color: blueviolet;
}

.el-tabs:deep(.el-tabs__item:hover) {
  color: blueviolet;
}

.el-tabs:deep(.el-tabs__active-bar) {
  background-color: blueviolet;
}
</style>
