<template>
  <div style="padding: 0">
    <el-table
      :data="tableData"
      class="notice-table"
      stripe
      height="58vh"
      @row-click="jump"
    >
      <el-table-column prop="fig" label="" width="20" />
      <el-table-column prop="title" label="标题" width="150" />
      <el-table-column prop="txt" label="预览" width="300" />
      <el-table-column prop="user_id" label="发布者" width="75" />
      <el-table-column prop="time" label="发布时间" width="175" />
      <el-table-column prop="ddl" label="截止时间" />
    </el-table>
  </div>
</template>

<script>
import { moduleNotices } from '/@/api/notice';
import router from '/@/router';
import { getLocalUserId, getToken } from '/@/utils/auth.ts';

export default {
  name: 'NoticeView',
  components: {},
  data: () => {
    return {
      tableData: [
        {
          // eslint-disable-next-line camelcase
          notice_id: 123,
          title: 'xxx',
          txt: 'yyy',
          // eslint-disable-next-line camelcase
          user_id: 123,
          // eslint-disable-next-line camelcase
          user_name: 'xxx',
          // eslint-disable-next-line camelcase
          block_id: 456,
          // eslint-disable-next-line camelcase
          block_name: 'zzz',
          time: 'yyyy-MM-dd hh:mm:ss',
          ddl: 'yyyy-MM-dd hh:mm:ss',
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('fetchData...', this);
      const block_id = router.currentRoute.value.params['id'];
      moduleNotices(block_id, getLocalUserId(), getToken())
        .then((res) => {
          console.log('notice.vue fetchData success: ', res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log('notice.vue fetchData fail: ', err);
        });
    },
    jump(row) {
      router.push('/notice/' + row.notice_id);
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

.notice-table {
  width: 100%;
  &:hover {
    cursor: pointer;
  }
}
</style>
