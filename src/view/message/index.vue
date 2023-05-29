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
              <span class="redDot" v-if="updateMessages.length > 0">
                {{ Math.min(updateMessages.length, 99) }}
              </span>
            </template>
            <DetailMessageTabPane
              v-if="updateMessages.length > 0"
              :list="updateMessages"
            />
            <el-empty v-else description="暂无相关消息"></el-empty>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <span>积分记录</span>
              <span class="redDot" v-if="pointMessages.length > 0">
                {{ Math.min(pointMessages.length, 99) }}
              </span>
            </template>
            <DetailMessageTabPane
              v-if="pointMessages.length > 0"
              :list="pointMessages"
            />
            <el-empty v-else description="暂无相关消息"></el-empty>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <span>系统通知</span>
              <span class="redDot" v-if="systemMessages.length > 0">
                {{ Math.min(systemMessages.length, 99) }}
              </span>
            </template>
            <DetailMessageTabPane
              v-if="systemMessages.length > 0"
              :list="systemMessages"
            />
            <el-empty v-else description="暂无相关消息"></el-empty>
          </el-tab-pane>
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
import { pointType, systemType, updateType } from '/@/utils/type';
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

const filterMessages = () => {
  for (let item of allMessages.value) {
    if (updateType.find((i) => i === item.message_type) >= 0) {
      updateMessages.value.push(item);
    } else if (pointType.find((i) => i === item.message_type) >= 0) {
      pointMessages.value.push(item);
    } else if (systemType.find((i) => i === item.message_type) >= 0) {
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
