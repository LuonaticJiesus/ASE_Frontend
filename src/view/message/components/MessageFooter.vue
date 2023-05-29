<template>
  <el-text>
    {{ getDateDiff(message.time) }}
    {{ hasModuleName() ? '· ' + message.sender_name : '' }}
    {{ hasUserName() ? '· ' + message.sender_name : '' }}
  </el-text>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { messageType } from '/@/utils/type';
import { getDateDiff } from '/@/utils/string';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  message: {
    type: Object as PropType<messageType>,
    default: Object,
  },
});

const moduleNameList = [101, 102];
const userNameList = [304, 305];
const hasModuleName = () => {
  return moduleNameList.includes(props.message.message_type);
};

const hasUserName = () => {
  console.log(userNameList.includes(props.message.message_type));
  return userNameList.includes(props.message.message_type);
};
</script>
<script lang="ts">
export default {
  name: 'MessageFooter',
};
</script>

<style scoped></style>
