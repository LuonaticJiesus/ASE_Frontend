<template>
  <el-card class="info-card">
    <el-form :label-position="'top'" label-width="100px" class="form-wrapper">
    </el-form>
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'userStat',
};
</script>

<style scoped>
.info-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: none;
}
.form-wrapper {
  width: 460px;
}
.form-wrapper:deep(.el-form-item__label) {
  font-size: 20px;
  font-weight: bold;
}
</style>
