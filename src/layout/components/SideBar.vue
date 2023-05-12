<template>
  <div class="side-bar-div">
    <!--    1. sideBarItem在VDom上插节点
2. sideBar排列Item布局，设置link-to
3. todo: 手动维护active?--->
    <!--    先摆了，有个导航就行-->
    <el-menu class="custom-menu" :router="true">
      <el-scrollbar>
        <el-menu-item
          v-for="(route, index) in routes"
          :key="index"
          :index="route['children'][0].path"
        >
          <!--        <router-link :to="route['children'][0].path">-->
          <!--          <el-icon :size="16">-->
          <!--            <Edit />-->
          <!--          </el-icon>-->
          <el-icon :size="16">
            <component :is="route['children'][0].meta['icon']"></component>
          </el-icon>
          <span style="font-size: 16px">{{
            ' ' + route['children'][0].meta['title']
          }}</span>
          <!--        </router-link>-->
        </el-menu-item>
      </el-scrollbar>
      <el-button @click="handleLogOut">LogOut</el-button>
    </el-menu>
  </div>
</template>

<script>
import { usePermissionStore, useUserStore } from '/@/store/index.js';
import { Edit, Collection, User } from '@element-plus/icons-vue';
import { isExternal } from '/@/utils/validate.ts';
export default {
  name: 'SideBar',
  components: { Edit, Collection, User },
  setup() {
    const routes = usePermissionStore().sideRoutes;
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
    handleLogOut() {
      const userStore = useUserStore();
      userStore.logout();
    },
  },
};
</script>

<style>
.side-bar-div {
  padding-top: 10vh;
  text-align: center;
  margin-top: 30px;
}
.custom-menu {
  background-color: rgba(255, 255, 255, 0);
  max-height: 30vh;
}
</style>
