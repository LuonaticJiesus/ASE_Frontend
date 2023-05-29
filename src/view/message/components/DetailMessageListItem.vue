<template>
  <el-card body-style="padding:20px;" shadow="never" class="detail-message">
    <el-row align="middle">
      <el-col :span="2">
        <!--     icon：根据类别选择-->
        <!--      todo: <component :is='icon-name'>实现按类选择图标-->
        <el-avatar>
          <el-icon size="30"><Refresh /></el-icon>
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
import { Refresh } from '@element-plus/icons-vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  message: {
    type: Object as PropType<messageType>,
    default: Object,
  },
});
</script>
<script lang="ts">
export default {
  name: 'DetailMessageListItem',
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
