<template>
  <DivideContainer>
    <template #main>
      <router-view />
    </template>
    <template #right>
      <RightBoard />
    </template>
  </DivideContainer>
</template>

<script>
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
import router from '/@/router/index.js';
import { moduleInfo } from '/@/api/module';

export default {
  name: 'ModuleView',
  components: { RightBoard, DivideContainer },
  data: () => {
    return {
      activeName: 'first',
      moduleName: 'QuadSSSS',
      moduleAvator: '/src/assets/logo.png',
      tableData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('fetchData...', this);
      moduleInfo(0, 0, '')
        .then((res) => {
          console.log('module.vue fetchData success: ', res);
          this.moduleName = res.block_name;
          this.moduleAvator = res.block_logo;
        })
        .catch((err) => {
          console.log('module.vue fetchData failed: ', err);
        });
    },
    jump: (url) => {
      console.log('jump to ', url);
      router.push(url);
    },
  },
};
</script>

<style scoped>
.module-header {
  background-color: silver;
  height: 30vh;
  padding: 15;
}
.module-pannel {
  display: flex;
  background-color: white;
  height: 20vh;
  margin-top: 130px;
  margin-bottom: 0;
}
</style>
