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
  <DetailMessageDialog
    v-model:visible="dialogDetail"
    @closeDialog="closeDialogDetail"
    :message="message"
  ></DetailMessageDialog>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { messageType } from '/@/utils/type';
import DetailMessageDialog from '/@/view/message/components/DetailMessageDialog.vue';
import { confirmMessage } from '/@/api/message';

import MessageContent from '/@/view/message/components/MessageContent.vue';
import MessageFooter from '/@/view/message/components/MessageFooter.vue';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const props = defineProps({
  message: {
    type: Object as PropType<messageType>,
    default: Object,
  },
});

const headers = {
  userid: getLocalUserId(),
  token: getToken(),
};

const dialogDetail = ref(false);
const showDetail = () => {
  confirmMessage(headers, [{ message_id: props.message.message_id }]);
  dialogDetail.value = false;
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
