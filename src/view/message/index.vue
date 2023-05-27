<template>
  <DivideContainer>
    <template #main>
      <div class="message-center">
        <h2 style="margin: 0; text-align: start">消息中心</h2>
        <el-divider style="margin-top: 5px; margin-bottom: 10px"></el-divider>
        <el-tabs type="border-card" class="message-tab">
          <el-tab-pane>
            <template #label>
              <span>更新提醒</span>
              <span class="redDot">{{ 99 }}</span>
            </template>
            <DetailMessageTabPane :list="updateMessages">
            </DetailMessageTabPane>
          </el-tab-pane>
          <el-tab-pane label="积分记录">
            <DetailMessageTabPane :list="pointMessages"> </DetailMessageTabPane
          ></el-tab-pane>
          <el-tab-pane label="系统通知"
            ><DetailMessageTabPane :list="systemMessages">
            </DetailMessageTabPane
          ></el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <template #right> <RightBoard /> </template>
  </DivideContainer>
</template>

<script setup lang="ts">
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
import DetailMessageTabPane from '/@/view/message/components/DetailMessageTabPane.vue';
import { onMounted, ref } from 'vue';
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
  if (result && result.length > 0) {
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
  name: 'MessageView',
};
</script>

<style scoped>
.message-center {
  padding: 20px;
}
.message-tab {
  padding: 0;
}
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
</style>
