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
      <el-table-column width="100px" label="预览">
        <template #default="{ row }">
          <el-button text @click="handlePreviewOneFile(row)">
            <el-icon :size="16" color="1a1a1a"><View /></el-icon>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="下载">
        <template #default="{ row }">
          <el-button text>
            <a v-download="row"
              ><el-icon :size="16" color="#1a1a1a"><Download /></el-icon
            ></a>
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
import { Download, View } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
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

const multiplyDownload = () => {
  if (selectedList.value.length === 0) {
    ElMessage({
      type: 'error',
      message: '您还没有勾选任何文件!',
    });
    return;
  }
  const zip = new JSZip();
  const cache = {};
  const promises = [];
  selectedList.value.forEach((item) => {
    const promise = getFile(item.url).then((data) => {
      // 下载文件, 并存成ArrayBuffer对象
      const file_name: string = item.name; // 获取文件名
      // noinspection TypeScriptValidateTypes
      zip.file(file_name, data, { binary: true }); // 逐个添加文件
      cache[file_name] = data;
    });
    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    zip.generateAsync({ type: 'blob' }).then((content) => {
      // 生成二进制流
      FileSaver.saveAs(
        content,
        'download_' + new Date().toLocaleTimeString() + '.zip',
      ); // 利用file-saver保存文件
    });
  });
};

const handlePreviewOneFile = (file: fileType) => {
  if (file.name.match('^[\\s\\S]*\\.(pdf)$')) {
    // pdf直接预览
    window.open(file.url);
  } else {
    ElMessageBox.confirm('PDF文件才能在线预览，要直接下载吗?', 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      window.open(file.url);
    });
  }
};

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