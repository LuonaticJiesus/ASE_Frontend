<template>
  <DivideContainer>
    <template #main>
      <router-view />
    </template>
    <template #right>
      <NoticeBoard />
    </template>
  </DivideContainer>
</template>

<script>
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import NoticeBoard from '/@/components/NoticeBoard.vue';

export default {
  name: 'ModuleView',
  components: { NoticeBoard, DivideContainer },
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
