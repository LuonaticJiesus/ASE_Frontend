<template>
  <div style="padding: 0">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="fig" label="" width="100" />
      <el-table-column prop="title" label="标题" width="150" />
      <el-table-column prop="txt" label="预览" width="250" />
      <el-table-column prop="author" label="作者" width="150" />
      <el-table-column prop="like_cnt" label="点赞" />
      <el-table-column prop="comment_cnt" label="评论" />
      <el-table-column prop="time" label="更新时间" />
    </el-table>
  </div>
</template>

<script>
import { moduleArticles } from '/@/api/article.js';
// import axios from 'axios';

export default {
  name: 'ShareView',
  components: {},
  data: () => {
    return {
      tableData: [
        {
          // eslint-disable-next-line camelcase
          post_id: 123,
          title: 'xxx',
          author: 'author',
          // eslint-disable-next-line camelcase
          user_id: 231,
          // eslint-disable-next-line camelcase
          user_name: 'yyy',
          txt: 'xxx',
          // eslint-disable-next-line camelcase
          block_id: 222,
          // eslint-disable-next-line camelcase
          block_name: 'zzz',
          time: '2222-33-44 22:55:00',
          // eslint-disable-next-line camelcase
          like_cnt: 456,
          // eslint-disable-next-line camelcase
          comment_cnt: 123,
          // eslint-disable-next-line camelcase
          like_state: 1,
          // eslint-disable-next-line camelcase
          latest_update_user: 'xxxx',
          // eslint-disable-next-line camelcase
          latest_time: '2222-33-44 22:55:00',
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('fetchData....', this);
      moduleArticles(0, 0, '')
        .then((res) => {
          console.log('share.vue fetchData success: ', res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log('share.vue fetchData fail: ', err);
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
</style>
