<template>
  <div style="padding: 0">
    <el-table
      :key="tableDataKey"
      :data="tableData"
      class="share-table"
      height="58vh"
      :row-style="{ height: '15vh' }"
      @row-click="jump"
    >
      <el-table-column prop="fig" label="" width="20" />
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
      <el-table-column prop="time" label="更新时间" width="140" sortable />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.stop="handleEdit(scope.$index, scope.row)"
            v-if="false"
          >
            编辑
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click.stop="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteArticle, moduleUserArticles } from '/@/api/article.js';
import router from '/@/router';
import { getLocalUserId, getToken } from '/@/utils/auth.ts';
import { strippedHtml } from '/@/utils/string';
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';

export default {
  name: 'selfView',
  components: {},
  data() {
    return {
      tableData: [],
      tableDataKey: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('module/self.vue fetchData....', this);
      const userid = getLocalUserId();
      const token = getToken();
      const block_id = router.currentRoute.value.params['id'];
      moduleUserArticles(userid, token, block_id)
        .then((res) => {
          console.log('self.vue fetchData success: ', res);
          this.tableData = res;
          for (let i of this.tableData) {
            i.txt = strippedHtml(i.txt);
            i.time = new Date(i.time).toLocaleString();
          }
        })
        .catch((err) => {
          console.log('self.vue fetchData fail: ', err);
        });
      this.tableDataKey = 1 - this.tableDataKey;
    },
    jump(row) {
      router.push('/post/' + row.post_id);
    },
    handleEdit(index, row) {
      console.log('edit self post ', index, row.post_id);
      router.push({
        path: '/editor',
        query: {
          post_id: row.post_id,
          moduleId: row.block_id,
        },
      });
    },
    handleDelete(index, row) {
      console.log('delete self post ', index, row);
      ElMessageBox.confirm('确定删除该文章?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteArticle(row.post_id, getLocalUserId(), getToken()).then(() => {
            ElMessage({
              type: 'success',
              message: '删除成功',
            });
            this.fetchData();
          });
          // location.reload();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除',
          });
        });
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
}

.share-table:hover {
  cursor: pointer;
}

.el-table :deep(.el-popper) {
  display: none;
}
</style>
