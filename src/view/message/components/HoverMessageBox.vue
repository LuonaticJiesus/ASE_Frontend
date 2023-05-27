<template>
  <el-tabs type="card" :stretch="true">
    <el-tab-pane>
      <template #label>
        <span>更新提醒</span>
        <span class="redDot">{{ 99 }}</span>
      </template>
      <MessageBoxTabPane />
    </el-tab-pane>
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

<style scoped>
.redDot {
  margin-left: 5px;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: red;
  text-align: center;
  vertical-align: center;
  font-size: small;
}
</style>
