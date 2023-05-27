<template>
  <el-scrollbar max-height="250px" style="padding: 0 5px 0 5px">
    <SimpleMessage v-for="message of list" :key="message.message_id" />
  </el-scrollbar>

  <el-button text type="primary" style="font-size: small">
    此页设为已读
  </el-button>
</template>

<script setup lang="ts">
import SimpleMessage from '/@/view/message/components/SimpleMessage.vue';
import { PropType } from 'vue';
import { messageType } from '/@/utils/type';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  list: {
    type: Array as PropType<messageType[]>,
    default: Array,
  },
});
</script>
<script lang="ts">
export default {
  name: 'MessageBoxTabPane',
};
</script>

<style scoped></style>
