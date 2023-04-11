<template>
  <div style="margin: 10px; padding: 5px; border: 2px solid #535bf2">
    <el-row justify="space-between">
      <el-col :span="12">
        <h3 class="right-board-title">通知版</h3>
      </el-col>
      <el-col :span="8">
        <el-button v-show="true">发布通知</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-tabs style="width: 90%">
        <el-tab-pane label="未截止"> 1 </el-tab-pane>
        <el-tab-pane label="所有"> 2 </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RightBoard',
};
</script>

<style>
.right-board-title {
  margin: 0;
  text-align: left;
}
.right-board-title::after {
  content: '';
  width: 40px;
  height: 2px;
  position: absolute;
  top: 28px;
  left: 2px;
  background-color: #535bf2;
  box-sizing: border-box;
}
</style>
