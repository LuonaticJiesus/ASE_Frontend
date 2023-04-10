<template>
  <div class="side-bar-div">
    <h1>SideBar</h1>
    <!--    1. sideBarItem在VDom上插节点
2. sideBar排列Item布局，设置link-to
3. todo: 手动维护active?--->
    <!--    先摆了，有个导航就行-->
    <el-menu class="el-menu--vertical">
      <el-menu-item v-for="item in routes" :key="item">
        <router-link :to="routes[item]">
          <el-icon>
            <Edit></Edit>
          </el-icon>
          <span>Edit</span>
          <span>MyPost</span>
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { accessedRoutes } from '/@/router/index.js';
export default {
  name: 'SideVar',
  setup() {
    const routes = accessedRoutes;
    return {
      routes,
    };
  },
};
</script>

<style scoped>
.side-bar-div {
  padding-top: 10vh;
}
</style>
