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
        <el-tab-pane label="未截止">
          <el-card
            v-for="item of unEndedNotices"
            :key="item"
            class="notice-card-simple"
            shadow="hover"
          >
            <el-row justify="space-between">
              <el-col
                :span="8"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <el-image
                  style="max-width: 40px; max-height: 40px; border-radius: 20px"
                  src="/src/assets/logo.png"
                  :fit="'fill'"
                >
                </el-image>
              </el-col>
              <el-col
                :span="16"
                style="
                  display: flex;
                  align-items: center;
                  flex-direction: row;
                  flex-wrap: wrap;
                  justify-content: left;
                "
              >
                <h4
                  style="
                    margin: 0;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  "
                >
                  {{ item.title }}
                </h4>
                <span
                  style="
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  "
                >
                  {{ item.content }}
                </span>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="所有">
          <el-card
            v-for="item of allNotices"
            :key="item"
            class="notice-card-simple"
            shadow="hover"
          >
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
let unEndedNotices = ref([
  {
    title: 'notice1',
    content: 'content of notice1-1-1',
  },
  {
    title: 'notice2',
    content: 'content of notice2',
  },
]);
let allNotices = ref([]);
const updateNoticeList = () => {
  const list = getNoticeList;
  // 根据截止时间分成两个array
  allNotices.value = list;
};
onMounted(() => {
  updateNoticeList();
});
</script>

<style scoped>
.right-board {
  margin: 10px;
  padding: 5px;
  border: 2px solid #535bf2;
  border-radius: 12px;
  box-shadow: rgba(58, 46, 68, 0.08) 0 15px 100px 0;
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

.notice-card-simple {
  margin-bottom: 10px;
}

.el-card:deep(.el-card__body) {
  padding: 10px 0 10px;
}
</style>
