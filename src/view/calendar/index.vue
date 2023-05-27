<template>
  <DivideContainer>
    <template #main>
      <h1>这里是日历</h1>
    </template>
    <template #right>
      <RightBoard />
    </template>
  </DivideContainer>
</template>

<script setup lang="ts">
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
</script>
<script lang="ts">
export default {
  name: 'CalendarView',
};
</script>

<style scoped></style>
