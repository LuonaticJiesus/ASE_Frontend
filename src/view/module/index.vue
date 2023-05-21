<template>
  <router-view />
</template>

<script>
import { defaultLogo } from '/@/utils/string.ts';

export default {
  name: 'ModuleView',
  setup() {
    return {
      activeName: 'first',
      moduleName: 'QuadSSSS',
      moduleAvator: defaultLogo,
      tableData: [],
    };
  },
  methods: {},
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
