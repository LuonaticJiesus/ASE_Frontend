<template>
  <el-main class="post-div">
    <router-view class="post-router"></router-view>
  </el-main>
</template>

<script>
export default {
  name: 'PostView',
};
</script>

<style scoped>
.post-div {
  padding: 0;
  height: 100%;
}
.post-router {
  height: 100%;
}
</style>
