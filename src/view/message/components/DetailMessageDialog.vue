<template>
  <el-dialog
    :model-value="visible"
    modal
    :show-close="false"
    style="border-radius: 12px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <div class="my-header">
        <h4>消息详情</h4>
        <div>{{ props.message.source_content }}</div>
        <el-button type="danger" @click="closeDialog">
          <el-icon class="el-icon--left">
            <CircleClose></CircleClose>
            关闭
          </el-icon>
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { CircleClose } from '@element-plus/icons-vue';
import { messageType } from '/@/utils/type';

const emit = defineEmits(['closeDialog']);
const closeDialog = () => {
  emit('closeDialog');
};
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: Object as PropType<messageType>,
    default: Object,
  },
});
</script>
<script lang="ts">
export default {
  name: 'DetailMessageDialog',
};
</script>

<style scoped></style>
