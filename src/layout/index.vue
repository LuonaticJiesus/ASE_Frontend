<template>
  <el-container>
    <el-aside class="layout-aside">
      <div class="side-background">
        <el-image
          style="border-radius: 50%; width: 170px; height: 170px"
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
      <el-header class="layout-header"> <h2>Header</h2> </el-header>
      <el-main>
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

export default {
  name: 'BasicLayout',
  components: { SideBar, UserInfo, AppMain },
};
</script>

<style scoped></style>
