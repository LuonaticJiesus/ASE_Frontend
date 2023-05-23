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
import { ref } from 'vue';
import NoticeEditor from '/@/components/NoticeEditor.vue';

export default {
  name: 'HomeView',
  components: { NoticeEditor, RightBoard, DivideContainer },
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
