<template>
  <el-container>
    <el-aside class="layout-aside">
      <div class="side-background">
        <UserInfo></UserInfo>
      </div>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <HeadVar></HeadVar>
      </el-header>
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
import HeadVar from './components/HeadVar.vue';

export default {
  name: 'BasicLayout',
  components: { UserInfo, AppMain, HeadVar },
};
</script>

<style scoped>
.layout-header {
  margin: 0;
  border: 0;
}
</style>
