<template>
  <el-card
    body-style="padding:5px;"
    shadow="never"
    class="simple-message"
    @click="showDetail"
  >
    <span style="display: flex; justify-content: start">
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path
          d="M512 322c-104.92 0-190 85.08-190 190s85.08 190 190 190 190-85.06 190-190-85.08-190-190-190z"
          fill="#F5260B"
        ></path>
      </svg>

      <el-text truncated style="color: black">
        {{ '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容' }}
      </el-text>
    </span>

    <el-text>
      {{ '2个月前 · 模块名称 · 评论者' }}
    </el-text>
  </el-card>
  <el-divider style="margin: 10px 0 10px 0"></el-divider>
  <DetailMessage
    v-model:visible="dialogDetail"
    @closeDialog="closeDialogDetail"
  ></DetailMessage>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import DetailMessage from '/@/view/message/components/DetailMessage.vue';
import { messageType } from '/@/utils/type';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  message: {
    type: Object as PropType<messageType>,
    default: Object,
  },
});

const dialogDetail = ref(false);
const showDetail = () => {
  dialogDetail.value = true;
};
const closeDialogDetail = () => {
  dialogDetail.value = false;
};
</script>
<script lang="ts">
export default {
  name: 'SimpleMessage',
};
</script>

<style scoped>
.simple-message {
  border: 0;
  background-color: rgba(255, 255, 255, 0);
}
.simple-message:hover,
.simple-message:active,
.simple-message:focus {
  cursor: pointer;
  background-color: #e7e7e7;
}
</style>
