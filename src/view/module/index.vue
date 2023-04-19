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
  methods: {},
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
