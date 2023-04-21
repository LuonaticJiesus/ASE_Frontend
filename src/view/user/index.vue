<template>
  <DivideContainer>
    <template #main>
      <div class="userSetting-head"></div>
      <div class="userSetting-body">
        <router-view></router-view>
      </div>
    </template>
    <template #right>
      <RightBoard></RightBoard>
    </template>
  </DivideContainer>
</template>

<script lang="ts">
export default {
  name: 'userView',
};
</script>

<script lang="ts" setup>
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
</script>

<style scoped>
.userSetting-head {
  height: 150px;
  border-style: solid;
  border-bottom: #1a1a1a;
}
</style>
