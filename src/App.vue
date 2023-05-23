<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const locale = zhCn;
</script>

<template>
  <el-config-provider :locale="locale">
    <keep-alive>
      <router-view />
    </keep-alive>
  </el-config-provider>
</template>

<style scoped></style>
