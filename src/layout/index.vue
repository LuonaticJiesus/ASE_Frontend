<template>
  <el-container>
    <el-aside class="layout-aside">
      <div class="side-background">
        <el-image
          style="border-radius: 50%; width: 210px; height: 210px; margin-top: 0"
          :src="'https://2023-ase-quadssss-1314332102.cos.ap-beijing.myqcloud.com/16838978307581384pya7nx6c.png'"
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
