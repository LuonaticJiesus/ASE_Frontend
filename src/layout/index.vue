<template>
  <el-container>
    <el-aside class="layout-aside">
      <div class="side-background">
        <el-image
          style="border-radius: 50%; width: 230px; height: 230px; margin-top: 0"
          :src="'/src/assets/logo-vv.png'"
          :fit="'cover'"
          lazy
        >
        </el-image>
        <UserInfo></UserInfo>
      </div>
      <SideBar> </SideBar>
    </el-aside>
    <el-container>
      <el-header class="layout-header"> <HeadBar /> </el-header>
      <el-main
        style="
          padding: 0;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        "
      >
        <AppMain></AppMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppMain from '/@/layout/components/AppMain.vue';
import '/@/style/layout.css';
import UserInfo from '/@/layout/components/UserInfo.vue';
import SideBar from '/@/layout/components/SideBar.vue';
import HeadBar from '/@/layout/components/HeadBar.vue';
import { useUserStore } from '/@/store/index.js';

export default {
  name: 'BasicLayout',
  components: { HeadBar, SideBar, UserInfo, AppMain },
  methods: {
    quit(event) {
      if (
        event.currentTarget.performance.navigation.type !==
        PerformanceNavigation.TYPE_RELOAD
      ) {
        const userStore = useUserStore();
        userStore.logout();
      } else {
        console.log('just refresh');
      }
    },
  },
  mounted() {
    window.addEventListener('beforeunload', this.quit);
  },
};
</script>

<style scoped>
.el-header {
  margin: 0;
  padding: 0;
}
</style>
