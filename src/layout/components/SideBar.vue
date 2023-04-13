<template>
  <div class="side-bar-div">
    <!--    1. sideBarItem在VDom上插节点
2. sideBar排列Item布局，设置link-to
3. todo: 手动维护active?--->
    <!--    先摆了，有个导航就行-->
    <el-menu class="el-menu--vertical" :router="true">
      <el-menu-item
        v-for="(route, index) in routes"
        :key="index"
        :index="route['children'][0].path"
        class="el-menu-item"
      >
        <!--        <router-link :to="route['children'][0].path">-->
        <el-icon>
          <Edit />
        </el-icon>
        <span>{{ ' ' + route['children'][0]['name'] }}</span>
        <!--        </router-link>-->
      </el-menu-item>
    </el-menu>
    <el-button>
      <router-link to="/">To Root </router-link>
    </el-button>
  </div>
</template>

<script>
import { usePermissionStore } from '/@/store/index.js';
import { Edit } from '@element-plus/icons-vue';
import { isExternal } from '/@/utils/validate.ts';
export default {
  name: 'SideBar',
  components: { Edit },
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
  },
  mounted() {
    console.log(this.routes);
  },
};
</script>

<style>
.side-bar-div {
  padding-top: 10vh;
  text-align: center;
}
.el-menu--vertical {
  background-color: rgba(255, 255, 255, 0);
}
</style>
