<template>
  <div style="padding: 0">
    <el-table
      :data="tableData"
      class="share-table"
      height="58vh"
      @row-click="jump"
    >
      <el-table-column prop="fig" label="" width="20" />
      <el-table-column prop="title" label="标题" width="150" />
      <el-table-column prop="txt" label="预览" width="250" />
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
      const block_id = router.currentRoute.value.params['id'];
      moduleArticles(block_id, getLocalUserId(), getToken())
        .then((res) => {
          console.log('share.vue fetchData success: ', res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log('share.vue fetchData fail: ', err);
        });
    },
    jump(row) {
      console.log('jump to ', row.post_id);
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
</style>
