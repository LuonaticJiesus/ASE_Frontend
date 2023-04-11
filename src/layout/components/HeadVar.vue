<template>
  <div class="headVar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">LOGO</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1">收藏</el-menu-item>
      <el-menu-item index="2">点赞</el-menu-item>
      <el-menu-item index="3">评论</el-menu-item>
      <el-menu-item index="4">订阅</el-menu-item>
    </el-menu>
    <div>
      <h1>hello</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.headVar {
  margin: 0;
}

.flex-grow {
  flex-grow: 1;
}
</style>
