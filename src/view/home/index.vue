<template>
  <DivideContainer>
    <template #main>
      <div v-if="mdDocument">
        <v-md-preview :text="mdDocument"></v-md-preview>
      </div>
      <NoticeEditor
        v-model:visible="dialogEditor"
        @close="dialogEditor = false"
      ></NoticeEditor>
    </template>
    <template #right>
      <RightBoard />
    </template>
  </DivideContainer>
</template>

<script>
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
import { ref } from 'vue';
import NoticeEditor from '/@/components/NoticeEditor.vue';

export default {
  name: 'HomeView',
  components: { NoticeEditor, RightBoard, DivideContainer },
  data() {
    return {
      mdDocument: null,
    };
  },
  async mounted() {
    let response = await fetch('src/assets/markdown/firstPage.md');
    this.mdDocument = await response.text();
    console.log('md:', this.mdDocument);
  },
  setup() {
    let dialogEditor = ref(false);
    const showNoticeEditor = () => {
      dialogEditor.value = true;
    };
    return {
      dialogEditor,
      showNoticeEditor,
    };
  },
};
</script>

<style scoped></style>
