<template>
  <DivideContainer>
    <template #main>
      <el-scrollbar style="max-height: 88vh">
        <v-md-preview
          :text="mdDocument"
          style="text-align: start"
        ></v-md-preview>
      </el-scrollbar>
    </template>
    <template #right>
      <RightBoard />
    </template>
  </DivideContainer>
</template>

<script>
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
import { onMounted, ref } from 'vue';

export default {
  name: 'HomeView',
  components: { RightBoard, DivideContainer },
  setup() {
    const mdDocument = ref('');
    onMounted(async () => {
      const response = await fetch('/markdown/firstPage.md');
      mdDocument.value = await response.text();
    });
    return {
      mdDocument,
    };
  },
};
</script>

<style scoped></style>
