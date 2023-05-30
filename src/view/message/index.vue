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
              <span class="redDot" v-if="updateNumber > 0">
                {{ Math.min(updateNumber, 99) }}
              </span>
            </template>
            <DetailMessageTabPane
              v-if="updateMessages.length > 0"
              :list="updateMessages"
              @click-row="confirmUpdate"
            />
            <el-empty v-else description="暂无相关消息"></el-empty>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <span>积分记录</span>
              <span class="redDot" v-if="pointNumber > 0">
                {{ Math.min(pointNumber, 99) }}
              </span>
            </template>
            <DetailMessageTabPane
              v-if="pointMessages.length > 0"
              :list="pointMessages"
              @click-row="confirmPoint"
            />
            <el-empty v-else description="暂无相关消息"></el-empty>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <span>系统通知</span>
              <span class="redDot" v-if="systemNumber > 0">
                {{ Math.min(systemNumber, 99) }}
              </span>
            </template>
            <DetailMessageTabPane
              v-if="systemMessages.length > 0"
              :list="systemMessages"
              @click-row="confirmSystem"
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
import { confirmMessage, getMessageList } from '/@/api/message';
import { pointType, systemType, updateType } from '/@/utils/type';
const allMessages = ref([]);
const updateMessages = ref([]);
const pointMessages = ref([]);
const systemMessages = ref([]);

const updateNumber = ref<number>(0);
const pointNumber = ref<number>(0);
const systemNumber = ref<number>(0);

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
      if (item.state === 0) {
        updateNumber.value += 1;
      }
    } else if (pointType.find((i) => i === item.message_type) >= 0) {
      pointMessages.value.push(item);
      if (item.state === 0) {
        pointNumber.value += 1;
      }
    } else if (systemType.find((i) => i === item.message_type) >= 0) {
      systemMessages.value.push(item);
      if (item.state === 0) {
        systemNumber.value += 1;
      }
    }
  }
};

const confirmUpdate = async (index: number) => {
  console.log('confirmUpdate(' + index + ')');
  const message = updateMessages.value[index];
  if (message.state === 1) {
    return;
  }
  await confirmMessage(headers, [{ message_id: message.message_id }]);
  updateMessages.value[index].state = 1;
  updateNumber.value -= 1;
};

const confirmPoint = async (index: number) => {
  console.log('confirmPoint(' + index + ')');
  const message = pointMessages.value[index];
  if (message.state === 1) {
    return;
  }
  await confirmMessage(headers, [{ message_id: message.message_id }]);
  pointMessages.value[index].state = 1;
  pointNumber.value -= 1;
};

const confirmSystem = async (index: number) => {
  console.log('confirmSystem(' + index + ')');
  const message = systemMessages.value[index];
  if (message.state === 1) {
    return;
  }
  await confirmMessage(headers, [{ message_id: message.message_id }]);
  systemMessages.value[index] = 1;
  systemNumber.value -= 1;
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
