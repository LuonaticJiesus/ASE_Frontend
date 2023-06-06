<template>
  <el-card
    body-style="padding:20px;"
    shadow="never"
    class="detail-message"
    @click="clickToConfirm"
  >
    <el-row align="middle">
      <el-col :span="2">
        <!--     icon：根据类别选择-->
        <el-avatar style="background: var(--el-color-primary-light-3)">
          <el-icon size="24">
            <component
              :is="messageConfigMap[message.message_type]['icon']"
            ></component
          ></el-icon>
        </el-avatar>
      </el-col>
      <el-col :span="22">
        <el-row justify="start">
          <MessageFooter
            style="font-size: smaller"
            :message="message"
          ></MessageFooter>
        </el-row>
        <el-row justify="start">
          <!--     详细内容-->
          <svg
            v-if="!message.state"
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
          <el-text style="color: black">
            <MessageContent
              style="font-size: medium"
              :message="message"
            ></MessageContent>
          </el-text>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
  <el-divider style="margin: 0"></el-divider>
</template>

<script setup lang="ts">
// 本组件拿到【单条消息】
import { PropType } from 'vue';
import { messageType } from '/@/utils/type';
import MessageContent from '/@/view/message/components/MessageContent.vue';
import MessageFooter from '/@/view/message/components/MessageFooter.vue';
import { messageConfigMap } from '/@/utils/message';

defineProps({
  message: {
    type: Object as PropType<messageType>,
    default: Object,
  },
});
const emit = defineEmits(['click-message']);
const clickToConfirm = () => {
  emit('click-message');
};
</script>
<script lang="ts">
import {
  Promotion,
  BellFilled,
  Collection,
  ChatSquare,
} from '@element-plus/icons-vue';
export default {
  name: 'DetailMessageListItem',
  components: { Promotion, BellFilled, Collection, ChatSquare },
};
</script>

<style scoped>
.detail-message {
  border: 0;
  background-color: rgba(255, 255, 255, 0);
}
.detail-message:hover,
.detail-message:active,
.detail-message:focus {
  cursor: pointer;
  background-color: var(--el-color-primary-light-10);
}
</style>
