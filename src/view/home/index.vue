<template>
  <DivideContainer>
    <template #main>
      <el-scrollbar style="max-height: 88vh">
        <div v-if="mdDocument">
          <v-md-preview :text="mdDocument" class="left-aligned"></v-md-preview>
        </div>
      </el-scrollbar>
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
import { ref, onMounted } from 'vue';
import NoticeEditor from '/@/components/NoticeEditor.vue';
export default {
  name: 'HomeView',
  components: { NoticeEditor, RightBoard, DivideContainer },

  setup() {
    let dialogEditor = ref(false);
    const showNoticeEditor = () => {
      dialogEditor.value = true;
    };
    const mdDocument = ref(null);
    onMounted(async () => {
      const response = await fetch('/markdown/firstPage.md');
      mdDocument.value = await response.text();
    });
    return {
      dialogEditor,
      showNoticeEditor,
      mdDocument,
    };
  },
};
</script>

<style scoped>
.scrollable {
  height: 85vh;
  overflow-y: auto;
}

.left-aligned {
  text-align: left;
}
</style>

<style scoped></style>
