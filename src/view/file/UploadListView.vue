<template>
  <el-popover
    trigger="focus"
    :placement="placement"
    :width="400"
    popper-style="border-radius: 12px;padding: 0"
    :show-arrow="false"
  >
    <template #reference>
      <slot name="button">
        <el-button type="primary" plain>
          <el-icon>
            <Link />
          </el-icon>
          添加附件
        </el-button>
      </slot>
    </template>
    <template #default>
      <slot name="list">
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          :auto-upload="false"
          v-model:file-list="fileList"
          :http-request="handleUploadFile"
          :before-upload="beforeFileUpload"
          :on-change="handleChange"
          :on-success="sendFileUrlList"
          :multiple="true"
          :limit="10"
        >
          <template #trigger>
            <el-button class="select-button" type="primary">选择文件</el-button>
          </template>

          <template #default>
            <el-button
              class="submit-button"
              type="success"
              @click="submitUpload"
            >
              上传
            </el-button>
          </template>

          <template #tip>
            <div class="el-upload__tip">
              允许格式: .pdf/.zip/.rar/.doc/.docx/.txt/.ppt/.xls/xlsx
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
import { uploadFile } from '/@/api/file';
import { Link } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

type placementType = 'top' | 'bottom';
const props = defineProps({
  placement: {
    type: String as PropType<placementType>,
    default: 'top',
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
const beforeFileUpload = (rawFile) => {
  const permitType = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/zip',
    'application/x-rar',
  ];
  if (permitType.indexOf(rawFile.type) === -1) {
    ElMessage.error('不支持的文件格式！');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 50) {
    ElMessage.error('单个文件不能大于50MB!');
  }
};
const submitUpload = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  uploadRef.value!.submit();
};
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  // console.log(uploadFile, uploadFiles);
};
const handleUploadFile = async (param) => {
  const formData = new FormData();
  formData.append('file', param.file);
  formData.append('name', param.file.name);
  console.log(param.file.name);
  let res = await uploadFile(formData);
  if (res) {
    fileUrlList.value.push(res.url);
    param.onSuccess(res);
  } else {
    param.onError('Failed');
  }
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

<style scoped>
.select-button {
  margin: 4px;
}
.submit-button {
  margin: 4px;
  float: right;
}
.el-upload__tip {
  margin: 2px;
}
</style>
