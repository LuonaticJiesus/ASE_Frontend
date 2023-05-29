<template>
  <el-card
    body-style="padding:5px;"
    shadow="never"
    class="simple-message"
    @click="showDetail"
  >
    <span style="display: flex; justify-content: start">
      <svg
        v-if="!message.state"
        class="icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path
          d="M512 322c-104.92 0-190 85.08-190 190s85.08 190 190 190 190-85.06 190-190-85.08-190-190-190z"
          fill="#F5260B"
        ></path>
      </svg>
      <el-text style="color: black">
        <MessageContent :message="message"></MessageContent>
      </el-text>
    </span>
    <MessageFooter :message="message"></MessageFooter>
  </el-card>
  <el-divider style="margin: 10px 0 10px 0"></el-divider>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { messageType } from '/@/utils/type';
import MessageContent from '/@/view/message/components/MessageContent.vue';
import MessageFooter from '/@/view/message/components/MessageFooter.vue';

defineProps({
  message: {
    type: Object as PropType<messageType>,
    default: Object,
  },
});

const emit = defineEmits(['click-message']);

const showDetail = () => {
  console.log('showDetail()');
  emit('click-message');
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
