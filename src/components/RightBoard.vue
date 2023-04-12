<template>
  <div style="margin: 10px; padding: 5px; border: 2px solid #535bf2">
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
        <el-tab-pane label="未截止">
          <el-card v-for="item of unEndedNotices" :key="indexOf(item)">
            <span>{{ item.title }}</span>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="所有">
          <el-card v-for="item of allNotices" :key="indexOf(item)">
            <span>{{ item.title }}</span>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script setup name="RightBoard">
import { onMounted, ref } from 'vue';
import { getNoticeList } from '/@/api/notice.js';
let unEndedNotices = ref([]);
let allNotices = ref([]);
onMounted(() => {
  const list = getNoticeList;
  // 根据截止时间分成两个array
  allNotices.value = list;
});
</script>

<style>
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
</style>
