<template>
  <div style="padding: 0">
    <el-table
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
        show-overflow-tooltip="true"
      />
      <el-table-column prop="user_name" label="作者" width="150" />
      <el-table-column prop="like_cnt" label="点赞" width="75" />
      <el-table-column prop="comment_cnt" label="评论" width="75" />
      <el-table-column prop="time" label="更新时间" />
    </el-table>
  </div>
</template>

<script>
import { moduleArticles } from '/@/api/article.js';
import router from '/@/router';
import { getLocalUserId, getToken } from '/@/utils/auth.ts';
import { strippedHtml } from '/@/utils/string';

export default {
  name: 'ShareView',
  components: {},
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
