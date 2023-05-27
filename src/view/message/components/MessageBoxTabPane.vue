<template>
  <SimpleMessage v-for="i of [1, 2]" :key="i" />
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
