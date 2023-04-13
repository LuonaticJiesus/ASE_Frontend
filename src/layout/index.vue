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
      <el-header class="layout-header">
        <HeadBar></HeadBar>
      </el-header>
      <el-main>
        <el-row>
          <el-col
            v-for="(o, index) in 2"
            :key="o"
            :span="8"
            :offset="index > 0 ? 2 : 0"
          >
            <CardModule></CardModule>
          </el-col>
        </el-row>
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
import CardModule from '/@/layout/components/CardModule.vue';

export default {
  name: 'BasicLayout',
  components: { SideBar, UserInfo, AppMain, HeadBar, CardModule },
};
</script>

<style scoped>
.el-header {
  margin: 0;
  padding: 0;
  height: auto;
}
</style>
