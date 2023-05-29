<template>
  <el-tabs type="card" :stretch="true" class="message-tab-pane">
    <el-tab-pane>
      <template #label>
        <span>更新提醒</span>
        <span class="redDot" v-if="updateMessages.length > 0">
          {{ updateMessages.length }}
        </span>
      </template>
      <MessageBoxTabPane
        v-if="updateMessages.length > 0"
        :list="updateMessages"
      />
      <el-empty v-else description="暂无相关消息"></el-empty>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span>积分记录</span>
        <span class="redDot" v-if="pointMessages.length > 0">
          {{ pointMessages.length }}
        </span>
      </template>
      <MessageBoxTabPane
        v-if="pointMessages.length > 0"
        :list="pointMessages"
      />
      <el-empty v-else description="暂无相关消息"></el-empty>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span>系统通知</span>
        <span class="redDot" v-if="systemMessages.length > 0">
          {{ systemMessages.length }}
        </span>
      </template>
      <MessageBoxTabPane
        v-if="systemMessages.length > 0"
        :list="systemMessages"
      />
      <el-empty v-else description="暂无相关消息"></el-empty>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MessageBoxTabPane from '/@/view/message/components/MessageBoxTabPane.vue';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { getMessageList } from '/@/api/message';
import { pointType, systemType, updateType } from '/@/utils/type';

const updateMessages = ref([]);
const pointMessages = ref([]);
const systemMessages = ref([]);

const headers = {
  userid: getLocalUserId(),
  token: getToken(),
};

const allMessages = ref([
  {
    message_id: 36,
    receiver_id: 80,
    content: '您的帖子/评论新增评论',
    message_type: 1,
    time: '2003-06-17 05:34:11',
    state: 0,
    extern_info: {
      'comment_id/post_id': 123,
      recv_comment_id: 456,
    },
  },
]);

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

onMounted(async () => {
  const result = await getMessageList(headers);
  if (result && result.length > 0) {
    allMessages.value = result;
    filterMessages();
  }
});
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
