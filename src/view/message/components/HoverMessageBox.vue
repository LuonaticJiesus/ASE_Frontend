<template>
  <el-tabs type="card" :stretch="true">
    <el-tab-pane label="更新提醒"> <MessageBoxTabPane /> </el-tab-pane>
    <el-tab-pane label="积分记录"> <MessageBoxTabPane /> </el-tab-pane>
    <el-tab-pane label="系统通知"> <MessageBoxTabPane /> </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts"></script>
<script lang="ts">
import MessageBoxTabPane from '/@/view/message/components/MessageBoxTabPane.vue';

export default {
  name: 'HoverMessageBox',
  components: { MessageBoxTabPane },
};
</script>

<style scoped></style>
