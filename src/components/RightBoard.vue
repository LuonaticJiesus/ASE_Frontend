<template>
  <div class="right-board">
    <el-row justify="space-between">
      <el-col :span="12">
        <h3 class="right-board-title">通知版</h3>
      </el-col>
      <el-col :span="8">
        <el-button v-show="true">发布通知</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-tabs style="width: 90%">
        <el-tab-pane label="未截止" class="notice-tab">
          <el-scrollbar>
            <NoticeSimple
              v-for="notice of unEndedNotices"
              :key="notice"
              :noticeItem="notice"
            ></NoticeSimple>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="所有" class="notice-tab">
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
  </div>
</template>

<script>
export default {
  name: 'RightBoard',
};
</script>

<script setup>
import { onMounted, ref } from 'vue';
import { getNoticeList, getUnduNoticeList } from '/@/api/notice.js';
import NoticeSimple from '/@/components/NoticeSimple.vue';
let unEndedNotices = ref([]);
let allNotices = ref([]);
const updateNoticeList = async () => {
  const list = await getNoticeList();
  // 根据截止时间分成两个array
  allNotices.value = list;
  const undue = await getUnduNoticeList();
  unEndedNotices.value = undue;
};
onMounted(() => {
  updateNoticeList();
});
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
