<template>
  <el-tabs type="card" :stretch="true" class="message-tab-pane">
    <el-tab-pane>
      <template #label>
        <span>更新提醒</span>
        <span class="redDot">{{ 99 }}</span>
      </template>
      <MessageBoxTabPane :list="updateMessages" />
    </el-tab-pane>
    <el-tab-pane label="积分记录">
      <MessageBoxTabPane :list="pointMessages" />
    </el-tab-pane>
    <el-tab-pane label="系统通知">
      <MessageBoxTabPane :list="systemMessages" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MessageBoxTabPane from '/@/view/message/components/MessageBoxTabPane.vue';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { getMessageList } from '/@/api/message';

const allMessages = ref([]);
const updateMessages = ref([]);
const pointMessages = ref([]);
const systemMessages = ref([]);

const headers = {
  userid: getLocalUserId(),
  token: getToken(),
};
onMounted(async () => {
  const result = await getMessageList(headers);
  if (result && result > 0) {
    allMessages.value = result;
    filterMessages();
  }
});

// 根据接口返回的消息类型编码分类
const updateType = [1, 2, 3];
const pointType = [4, 5, 6];
const systemType = [7, 8, 9];
const filterMessages = () => {
  for (let item of allMessages) {
    if (item in updateType) {
      updateMessages.value.push(item);
    } else if (item in pointType) {
      pointMessages.value.push(item);
    } else if (item in systemType) {
      systemMessages.value.push(item);
    }
  }
};
</script>
<script lang="ts">
export default {
  name: 'HoverMessageBox',
};
</script>

<style scoped>
.redDot {
  margin-left: 5px;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: red;
  text-align: center;
  vertical-align: center;
  font-size: small;
}
.message-tab-pane {
  background: linear-gradient(
    135deg,
    rgba(130, 36, 227, 0.04) 0%,
    rgba(255, 255, 255, 0) 25%,
    rgba(130, 36, 227, 0.07) 100%
  );
}
</style>
