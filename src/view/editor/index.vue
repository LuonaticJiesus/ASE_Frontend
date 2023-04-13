<template>
  <div>
    <div>
      <v-md-editor
        v-if="editorType === 'md'"
        class="md-editor"
        v-model="mdText"
      >
      </v-md-editor>
    </div>
    <div class="post-footer">
      <el-row>
        <el-col :span="3"> toTop </el-col>
        <el-col>
          <el-select-v2 v-model="editorType"> </el-select-v2>
        </el-col>
        <el-col :span="2">
          <el-button @click="handlePublishArticle"> </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { publishArticle } from '/@/api/article.js';

const mdText: Ref<string> = ref('');
const richText: Ref<string> = ref('');
const editorType: 'md' | 'rich' = 'md';

const handlePublishArticle = async () => {
  const text: string = editorType === 'md' ? mdText.value : richText.value;
  const data = {
    text: text,
  };
  const res = await publishArticle(data);
};
</script>
<script lang="ts">
export default {
  name: 'PostEditor.vue',
};
</script>

<style scoped>
.post-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
