<template>
  <div style="width: 100rem">
    <el-row>
      <el-button @click="multiplyDownload">
        <el-icon :size="20"><Download /></el-icon>
        <el-text>批量下载</el-text>
      </el-button>
      <el-text size="small" style="margin-left: 10px">
        已选中{{ selectedList.length }}/{{ fileList.length }}个
      </el-text>
    </el-row>
    <el-table stripe :data="fileList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column prop="name" label="全部文件" />
      <el-table-column width="100px">
        <template #default="{ row }">
          <el-button text @click="handleDownloadOneFile(row.url)">
            <el-icon :size="16"><Download /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue';
import { fileBelongTo, getFileList } from '/@/api/file';
import { fileBelongToType } from '/@/utils/type';
import { Download } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import axios from 'axios';
interface fileType {
  name: string;
  url: string;
}
const props = defineProps({
  fileType: {
    type: String as PropType<fileBelongToType>,
    default: '',
  },
  belongToId: {
    type: Number as PropType<number>,
    default: -1,
  },
});

const fileList = ref<fileType[]>([]);
const selectedList = ref<fileType[]>([]);

const fetchFileData = async () => {
  if (fileList.value.length <= 0) {
    await getFileList(fileBelongTo[props.fileType], props.belongToId).then(
      (res) => {
        for (let i = 0; i < res['url_list'].length; i++) {
          const name = res['name_list'][i];
          const url = res['url_list'][i];
          fileList.value.push({ name: name, url: url });
        }
      },
    );
  }
};
const getFile = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
};

const multiplyDownload = (path: string) => {
  if (selectedList.value.length === 0) {
    ElMessage({
      type: 'error',
      message: '您还没有勾选任何文件!',
    });
    return;
  } else if (selectedList.value.length === 1) {
    handleDownloadOneFile(selectedList.value[0].url);
    return;
  }
  const zip = new JSZip();
  const cache = {};
  const promises = [];
  selectedList.value.forEach((item) => {
    const promise = getFile(item.url).then((data) => {
      // 下载文件, 并存成ArrayBuffer对象
      const file_name: string = item.name; // 获取文件名
      zip.file(file_name); // 逐个添加文件
      cache[file_name] = data;
    });
    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    zip.generateAsync({ type: 'blob' }).then((content) => {
      // 生成二进制流
      FileSaver.saveAs(content, '打包下载.zip'); // 利用file-saver保存文件
    });
  });
};

const handleDownloadOneFile = (url) => {
  location.href = url;
};

// const handlePreviewOneFile = (url) => {
//   window.open(url);
// };

const handleSelectionChange = (val: fileType[]) => {
  selectedList.value = val;
};

onMounted(async () => {
  await fetchFileData();
  console.log(fileList);
});
</script>
<script lang="ts">
export default {
  name: 'DownloadListView',
};
</script>

<style scoped></style>
