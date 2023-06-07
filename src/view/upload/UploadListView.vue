<template>
  <el-popover
    trigger="click"
    :placement="placement"
    :width="400"
    popper-style="border-radius: 12px;padding: 0"
    :show-arrow="false"
  >
    <template #reference>
      <slot name="button">
        <el-button type="primary" plain>选择附件</el-button>
      </slot>
    </template>
    <template #default>
      <slot name="list">
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          :auto-upload="false"
          v-model:file-list="fileList"
          :on-change="handleChange"
          :on-success="sendFileUrlList"
        >
          <template #trigger>
            <el-button type="primary">select file</el-button>
          </template>

          <el-button class="ml-3" type="success" @click="submitUpload">
            upload to server
          </el-button>

          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ref } from 'vue';
import type { UploadInstance, UploadProps, UploadUserFile } from 'element-plus';

type placementType = 'top' | 'bottom';
const props = defineProps({
  placement: {
    type: String as PropType<placementType>,
    default: 'top',
  },
  belong: {
    type: Number as PropType<number>,
    default: 0,
  },
  id: {
    type: Number as PropType<number>,
    default: -1,
  },
  getFileUrlList: {
    type: Function,
    default: (list) => {
      return list;
    },
  },
});
const uploadRef = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);
const fileUrlList = ref<string[]>([]);
const submitUpload = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  uploadRef.value!.submit();
};
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const sendFileUrlList = () => {
  props.getFileUrlList(fileUrlList.value);
};
</script>
<script lang="ts">
export default {
  name: 'UploadListView',
};
</script>

<style scoped></style>
