<template>
  <div class="head-bar-div">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-input
        v-model="input2"
        class="w-5 m-2"
        placeholder="Please Input"
        :prefix-icon="Search"
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

<script>
import { usePermissionStore } from '/@/store/index.js';
import { isExternal } from '/@/utils/validate.ts';
export default {
  name: 'HeadBar',
  components: {},
  setup() {
    const routes = usePermissionStore().addRoutes;
    const basePath = '/';
    return {
      routes,
      basePath,
    };
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return this.basePath + routePath;
    },
  },
};
</script>

<style>
.side-bar-div {
  border: 2px;
  background-color: rgba(203, 32, 32, 0);
  margin: 10px;
  padding-top: 10vh;
}
.flex-grow {
  flex-grow: 1;
}
.el-menu--vertical {
  background-color: rgba(255, 255, 255, 0);
}
</style>
