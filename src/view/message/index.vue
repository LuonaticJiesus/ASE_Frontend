<template>
  <DivideContainer>
    <template #main>
      <h1>消息通知</h1>
      <h2>开发中</h2>
    </template>
    <template #right> <RightBoard /> </template>
  </DivideContainer>
</template>

<script>
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';

export default {
  name: 'MessageView',
  components: { RightBoard, DivideContainer },
};
</script>

<style scoped></style>
