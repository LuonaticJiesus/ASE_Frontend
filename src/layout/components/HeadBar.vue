<template>
  <div class="head-bar-div">
    <el-menu
      :default-active="activeIndex"
      style="height: 100%"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-input
        v-model="input2"
        style="font-size: 20px"
        placeholder="Please Input"
      />
      <div class="flex-grow" />
      <el-menu-item index="1">收藏</el-menu-item>
      <el-menu-item index="2">点赞</el-menu-item>
      <el-menu-item index="3">评论</el-menu-item>
      <el-menu-item index="4">订阅</el-menu-item>
      <el-menu-item index="5">
        <el-avatar class="mr-3" :size="32" src="/src/assets/logo.png" />
        <span class="text-large font-600 mr-3"> Username </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const input2 = ref('');
const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.head-bar-div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  border: 2px;
  background-color: rgba(203, 32, 32, 0);
  margin: 0;
}
.flex-grow {
  flex-grow: 1;
}
</style>
