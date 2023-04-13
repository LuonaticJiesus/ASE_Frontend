<template>
  <el-container>
    <el-header style="height: fit-content; padding: 2px">
      <el-input
        v-model="title"
        placeholder="请输入标题（不多于50字）"
        size="large"
      />
    </el-header>
    <el-main class="full-container" style="padding: 0">
      <!--      增加属性 :disabled-menus="[]"开启图片上传-->
      <v-md-editor
        ref="mdEditor"
        v-show="editorType === 'md'"
        class="md-editor"
        v-model="mdText"
        @upload-image="handleUploadImage"
        @save="handleSaveMdText"
      >
      </v-md-editor>
    </el-main>
    <el-footer style="padding: 0; height: fit-content">
      <el-row
        style="border-top: solid #646cff 1px; padding: 2px"
        align="middle"
      >
        <el-col :span="2">
          <h4 class="editor-bottom-label">字符统计:</h4>
        </el-col>
        <el-col :span="1">
          <span style="color: #bebebe">{{ mdText.length }}</span>
        </el-col>
        <el-col :span="2">
          <h4 class="editor-bottom-label">选择编辑器:</h4>
        </el-col>
        <el-col :span="3">
          <el-select v-model="editorType">
            <el-option
              v-for="item in editorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :offset="12" :span="1">
          <el-button class="normal-color-button" @click="handleEmitSave">
            保存
          </el-button>
        </el-col>
        <el-col :span="1" style="margin-left: 15px">
          <el-button class="normal-color-button" @click="handlePreviewMd">
            预览
          </el-button>
        </el-col>
        <el-col :span="1" style="margin-left: 15px">
          <el-button class="reverse-color-button" @click="handlePublishArticle">
            发布
          </el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { publishArticle } from '/@/api/article.js';
// noinspection TypeScriptCheckImport
import VMdEditor, { xss } from '@kangc/v-md-editor';

const title: Ref<string> = ref('');
const mdText: Ref<string> = ref('');
const richText: Ref<string> = ref('');
const editorType: Ref<string> = ref('md');
const editorOptions = [
  {
    value: 'rich',
    label: '富文本编辑器',
  },
  {
    value: 'md',
    label: 'Markdown编辑器',
  },
];

const handlePublishArticle = async () => {
  const text: string =
    editorType.value === 'md' ? mdText.value : richText.value;
  const data = {
    title: title,
    text: text,
  };
  const res = await publishArticle(data);
};

const handleUploadImage = (event, insertImage, files) => {
  return 1;
};

const handleSaveMdText = (text, html) => {
  console.log(text);
  console.log(html);
};

const handlePreviewMd = () => {
  let text = '';
  if (editorType.value === 'md') {
    text = mdText.value;
  } else {
    text = richText.value;
  }
  console.log(text);
};

const handleEmitSave = () => {
  // noinspection TypeScriptUnresolvedReference
  const html = xss.process(
    VMdEditor.vMdParser.themeConfig.markdownParser.render(mdText.value),
  );
  console.log(html);
};
</script>
<script lang="ts">
export default {
  name: 'PostEditor',
};
</script>

<style scoped>
.md-editor {
  width: 100%;
}
.reverse-color-button {
  background-color: #646cff;
  color: white;
}
.reverse-color-button:hover {
  background-color: white;
  color: #646cff;
}
.normal-color-button {
  background-color: white;
  color: #646cff;
}
.normal-color-button:hover {
  background-color: #646cff;
  color: white;
}
.editor-bottom-label {
  margin: 0;
  text-align: center;
}
</style>
