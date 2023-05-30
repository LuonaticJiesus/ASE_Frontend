<template>
  <el-scrollbar max-height="250px" style="padding: 0 5px 0 5px">
    <SimpleMessage
      v-for="(item, index) in list"
      :key="item.message_id"
      :message="item"
      @click-message="confirm(index)"
    />
  </el-scrollbar>
  <el-row justify="space-between">
    <el-button @click="confirmAll" link type="primary" class="link-button">
      此页设为已读
    </el-button>
    <el-button @click="jump" link type="primary" class="link-button">
      查看所有通知
    </el-button>
  </el-row>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { messageType } from '/@/utils/type';
import router from '/@/router';
import SimpleMessage from '/@/view/message/components/SimpleMessage.vue';

defineProps({
  list: {
    type: Array as PropType<messageType[]>,
    default: Array,
  },
});

const emit = defineEmits(['click-row', 'confirm-all']);

const confirm = (index: number) => {
  console.log('confirm(' + index + ')');
  emit('click-row', index);
};

const confirmAll = () => {
  console.log('confirmAll()');
  emit('confirm-all');
};

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
