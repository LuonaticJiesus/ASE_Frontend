<template>
  <div class="head-bar-div">
    <el-menu
      :default-active="activeIndex"
      style="height: 100%"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <div style="display: flex; align-items: center">
        <el-input
          v-model="input2"
          placeholder="Please Input"
          :prefix-icon="Search"
          class="custom-input"
        />
      </div>
      <div class="flex-grow" />
      <el-menu-item index="1"><h2>收藏</h2></el-menu-item>
      <el-menu-item index="2"><h2>点赞</h2></el-menu-item>
      <el-menu-item index="3"><h2>评论</h2></el-menu-item>
      <el-menu-item index="4"><h2>订阅</h2></el-menu-item>
      <el-menu-item index="5">
        <el-avatar class="mr-3" :size="32" src="/src/assets/logo.png" />
        <span
          class="text-large font-600 mr-3"
          style="margin-left: 10px; font-size: 18px"
        >
          Username
        </span>
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

<script lang="ts">
import { Search } from '@element-plus/icons-vue';

export default {
  computed: {
    Search() {
      return Search;
    },
  },
};
</script>

<style scoped>
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
.custom-input {
  font-size: 20px;
  height: 50%;
  width: 400px;
  margin-left: 50px;
  box-shadow: 0px 2px 0px 0px #e5e5e5;
}
.custom-input :deep(.el-input__wrapper) {
  background-color: #f9f3f9;
}
</style>
