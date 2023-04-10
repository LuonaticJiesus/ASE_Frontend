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
      <SideVar> </SideVar>
    </el-aside>
    <el-container>
      <el-header class="layout-header"> Header </el-header>
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
import SideVar from '/src/layout/components/SideBar.vue';

export default {
  name: 'BasicLayout',
  components: { SideVar, UserInfo, AppMain },
};
</script>

<style scoped></style>
