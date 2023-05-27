<template>
  <el-scrollbar max-height="250px">
    <SimpleMessage v-for="i of [1, 2, 3, 4, 5, 6, 7, 8]" :key="i" />
  </el-scrollbar>

  <el-button text type="primary" style="font-size: small">
    此页设为已读
  </el-button>
</template>

<script setup lang="ts"></script>
<script lang="ts">
import SimpleMessage from '/@/view/message/components/SimpleMessage.vue';

export default {
  name: 'MessageBoxTabPane',
  components: { SimpleMessage },
};
</script>

<style scoped></style>
