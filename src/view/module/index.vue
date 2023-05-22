<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name: 'ModuleView',
};
</script>

<style scoped>
.module-header {
  background-color: silver;
  height: 30vh;
  padding: 15px;
}
.module-pannel {
  display: flex;
  background-color: white;
  height: 20vh;
  margin-top: 130px;
  margin-bottom: 0;
}
</style>
