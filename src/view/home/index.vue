<template>
  <DivideContainer>
    <template #main>
      <!--      !!!!!在这里填页面-->
      <h1>Home</h1>
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
  name: 'HomeView',
  components: { RightBoard, DivideContainer },
};
</script>

<style scoped></style>
