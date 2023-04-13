<template>
  <FullContainer>
    <template #main>
      <v-md-editor> </v-md-editor>
    </template>
  </FullContainer>
</template>

<script>
import FullContainer from '/@/layout/components/FullContainer.vue';

export default {
  name: 'MdEditor',
  components: { FullContainer },
};
</script>

<style scoped></style>
