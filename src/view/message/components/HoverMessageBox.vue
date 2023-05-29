<template>
  <el-tabs type="card" :stretch="true" class="message-tab-pane">
    <el-tab-pane>
      <template #label>
        <span>更新提醒</span>
        <span class="redDot" v-if="updateNumber > 0">
          {{ Math.min(updateNumber, 99) }}
        </span>
      </template>
      <MessageBoxTabPane
        v-if="updateMessages.length > 0"
        :list="updateMessages"
        @click-row="confirmUpdate"
        @confirmAll="confirmUpdateAll"
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
      <MessageBoxTabPane
        v-if="pointMessages.length > 0"
        :list="pointMessages"
        @click-row="confirmPoint"
        @comfirmAll="confirmPointAll"
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
      <MessageBoxTabPane
        v-if="systemMessages.length > 0"
        :list="systemMessages"
        @click-row="confirmSystem"
        @confirmAll="confirmSystemAll"
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
import { confirmMessage } from '/@/api/message';

const updateNumber = ref<number>(0);
const pointNumber = ref<number>(0);
const systemNumber = ref<number>(0);
const updateMessages = ref([]);
const pointMessages = ref([]);
const systemMessages = ref([]);

const props = defineProps({
  fetchUnreadCount: {
    type: Function,
    default: () => {
      return 0;
    },
  },
});

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
  const result = await confirmMessage(headers, [
    { message_ids: [message.message_id] },
  ]);
  if (result) {
    updateMessages.value[index].state = 1;
    updateNumber.value -= 1;
  }
};

const confirmPoint = async (index: number) => {
  console.log('confirmPoint(' + index + ')');
  const message = pointMessages.value[index];
  if (message.state === 1) {
    return;
  }
  const result = await confirmMessage(headers, [
    { message_ids: [message.message_id] },
  ]);
  if (result) {
    pointMessages.value[index].state = 1;
    pointNumber.value -= 1;
  }
};

const confirmSystem = async (index: number) => {
  console.log('confirmSystem(' + index + ')');
  const message = systemMessages.value[index];
  if (message.state === 1) {
    return;
  }
  const result = await confirmMessage(headers, [
    { message_ids: [message.message_id] },
  ]);
  if (result) {
    systemMessages.value[index] = 1;
    systemNumber.value -= 1;
  }
};

const confirmUpdateAll = async () => {
  console.log('confirmUpdateAll()');
  if (updateNumber.value === 0) {
    return;
  }
  const result = await confirmMessage(headers, [
    updateMessages.value.map((item, index) => {
      return Object.assign({}, { message_id: item.message_id });
    }),
  ]);
  if (result) {
    updateMessages.value.forEach((item, index) => {
      if (item.state === 0) {
        updateMessages.value[index].state = 1;
      }
    });
    updateNumber.value = 0;
  }
};

const confirmPointAll = async () => {
  console.log('confirmPointAll()');
  if (pointNumber.value === 0) {
    return;
  }
  const result = await confirmMessage(headers, [
    pointMessages.value.map((item, index) => {
      return Object.assign({}, { message_id: item.message_id });
    }),
  ]);
  if (result) {
    pointMessages.value.forEach((item, index) => {
      if (item.state === 0) {
        pointMessages.value[index].state = 1;
      }
    });
    pointNumber.value = 0;
  }
};

const confirmSystemAll = async () => {
  console.log('confirmSystemAll()');
  if (systemNumber.value === 0) {
    return;
  }
  const result = await confirmMessage(headers, [
    systemMessages.value.map((item, index) => {
      return Object.assign({}, { message_id: item.message_id });
    }),
  ]);
  if (result) {
    systemMessages.value.forEach((item, index) => {
      if (item.state === 0) {
        systemMessages.value[index].state = 1;
      }
    });
    systemNumber.value = 0;
  }
};

onMounted(async () => {
  const result = await getMessageList(headers);
  if (result && result.length > 0) {
    allMessages.value = result;
    filterMessages();
    props.fetchUnreadCount(allMessages.value.length);
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
