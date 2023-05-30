<template>
  <div style="padding: 0">
    <el-table
      :data="tableData"
      class="share-table"
      height="58vh"
      :row-style="{ height: '15vh' }"
      @row-click="jump"
    >
      <el-table-column prop="title" label="标题" width="150" />
      <el-table-column
        prop="txt"
        label="预览"
        width="250"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="user_name" label="作者" width="100" />
      <el-table-column prop="like_cnt" label="点赞" width="80" sortable />
      <el-table-column prop="comment_cnt" label="评论" width="80" sortable />
      <el-table-column label="更新时间" width="140" sortable>
        <template #default="{ row }">
          <div style="text-align: start">
            <el-text>{{
              new Date(row.latest_time).toLocaleDateString()
            }}</el-text>
            <br />
            <el-text>{{
              new Date(row.latest_time).toLocaleTimeString()
            }}</el-text>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="danger"
            size="default"
            @click.stop="handleDelete(scope.$index, scope.row)"
          >
            <el-icon> <Delete /> </el-icon>
          </el-button>
          <!-- <el-button link type="primary" size="small">Edit</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { moduleArticles, deleteArticle } from '/@/api/article.js';
import router from '/@/router';
import { getLocalUserId, getToken } from '/@/utils/auth.ts';
import { strippedHtml } from '/@/utils/string';
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/el-message-box.css';
import { Delete } from '@element-plus/icons-vue';

export default {
  name: 'ShareView',
  components: { Delete },
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('module/share.vue fetchData....', this);
      const block_id = router.currentRoute.value.params['id'];
      moduleArticles(block_id, getLocalUserId(), getToken())
        .then((res) => {
          console.log('share.vue fetchData success: ', res);
          this.tableData = res;
          for (let i of this.tableData) {
            i.txt = strippedHtml(i.txt);
            i.time = new Date(i.time).toLocaleString();
          }
        })
        .catch((err) => {
          console.log('share.vue fetchData fail: ', err);
        });
    },
    jump(row) {
      router.push('/post/' + row.post_id);
    },
    handleDelete(index, row) {
      console.log('delete', index, row);
      ElMessageBox.confirm('确定删除该文章?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteArticle(row.post_id, getLocalUserId(), getToken()).then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
        });
      });
      // .catch(() => {
      //   ElMessage({
      //     type: 'info',
      //     message: '取消删除',
      //   });
      // });
    },
  },
};
</script>

<style scoped>
.module-header {
  background-color: silver;
  height: 30vh;
  padding: 0;
}
.module-pannel {
  display: flex;
  background-color: white;
  height: 30vh;
  margin-top: 130px;
  margin-bottom: 0;
}
.share-table {
  width: 100%;
  &:hover {
    cursor: pointer;
  }
}
.el-table :deep(.el-popper) {
  display: none;
}
</style>
