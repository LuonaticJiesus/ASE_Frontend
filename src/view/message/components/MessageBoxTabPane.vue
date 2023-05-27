<template>
  <el-scrollbar max-height="250px" style="padding: 0 5px 0 5px">
    <SimpleMessage v-for="message of list" :key="message.message_id" />
  </el-scrollbar>

  <el-row justify="space-between">
    <el-button link type="primary" class="link-button">
      此页设为已读
    </el-button>
    <el-button @click="jump" link type="primary" class="link-button">
      查看所有通知
    </el-button>
  </el-row>
</template>

<script setup lang="ts">
import SimpleMessage from '/@/view/message/components/SimpleMessage.vue';
import { PropType } from 'vue';
import { messageType } from '/@/utils/type';
import router from '/@/router';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  list: {
    type: Array as PropType<messageType[]>,
    default: Array,
  },
});

const jump = () => {
  router.push('/message');
};
</script>
<script lang="ts">
export default {
  name: 'MessageBoxTabPane',
};
</script>

<style scoped>
.link-button {
  font-size: small;
  padding: 5px;
}
</style>
