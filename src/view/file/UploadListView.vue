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
          :on-success="sendFileList"
          :before-remove="handleBeforeRemove"
          :multiple="true"
          :limit="10"
        >
          <template #trigger>
            <el-button class="select-button" type="primary"
              ><el-icon :size="16"><FolderOpened /></el-icon>选择文件</el-button
            >
          </template>

          <template #default>
            <el-button
              class="submit-button"
              type="success"
              @click="submitUpload"
            >
              <el-icon :size="16"><UploadFilled /></el-icon>
              上传
            </el-button>
          </template>

          <template #tip>
            <div class="el-upload__tip">
              单文件最大3MB<br />
              允许格式: .pdf/.zip/.doc/.docx/.txt/.ppt/.xls/xlsx
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
import { FolderOpened, Link, UploadFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

type placementType = 'top' | 'bottom';
const props = defineProps({
  placement: {
    type: String as PropType<placementType>,
    default: 'top',
  },
  beforePublish: {
    type: Boolean,
    default: false,
  },
  getFileUrlList: {
    type: Function,
    default: (list) => {
      return list;
    },
  },
  getFileNameList: {
    type: Function,
    default: (list) => {
      return list;
    },
  },
});
const uploadRef = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);
const fileMap = ref({});
const fileUrlList = ref<string[]>([]);
const fileNameList = ref<string[]>([]);
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
    'application/x-zip-compressed',
  ];
  console.log('now check file:' + rawFile.type);
  if (permitType.indexOf(rawFile.type) === -1) {
    ElMessage.error('不支持的文件格式！');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.error('单个文件不能大于3MB!');
    return false;
  }
};
const submitUpload = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  uploadRef.value!.submit();
};
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  // console.log('uploadFile', uploadFile.name);
  // console.log('fileNameList', fileNameList.value);
};
const handleUploadFile = async (param) => {
  if (fileMap.value[param.file.name]) {
    ElMessage.error({
      message: '附件中请勿出现同名文件！',
    });
    param.onError('Failed');
    return;
  }
  const formData = new FormData();
  formData.append('file', param.file);
  formData.append('name', param.file.name);
  await uploadFile(formData)
    .then((res) => {
      fileUrlList.value.push(res.url);
      fileNameList.value.push(param.file.name);
      fileMap.value[param.file.name] = res.url;
      param.onSuccess(res);
    })
    .catch((err) => {
      console.log('upload receive err', err);
      ElMessage.error({
        message: '可能是网络问题，请重新尝试！',
      });
      param.onError('Failed');
    });
};

const handleBeforeRemove = async (uploadFile) => {
  console.log('now would remove: ', uploadFile);
  const name = uploadFile.name;
  if (fileMap.value[name]) {
    const url = fileMap.value[name];
    fileUrlList.value = fileUrlList.value.filter((item) => item !== url);
    fileNameList.value = fileNameList.value.filter((item) => item !== name);
    delete fileMap.value[name];
  }
  console.log(fileNameList.value);
  await sendFileList();
};

const sendFileList = async () => {
  props.getFileUrlList(fileUrlList.value);
  props.getFileNameList(fileNameList.value);
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
