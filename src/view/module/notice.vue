<template>
  <div style="padding: 0">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="fig" label="" width="100" />
      <el-table-column prop="title" label="标题" width="150" />
      <el-table-column prop="txt" label="预览" width="250" />
      <el-table-column prop="userid" label="发布者" width="150" />
      <el-table-column prop="time" label="发布时间" />
      <el-table-column prop="ddl" label="截止时间" />
    </el-table>
  </div>
</template>

<script>
import { moduleNotices } from '/@/api/notice';

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
      moduleNotices(0, 0, '')
        .then((res) => {
          console.log('notice.vue fetchData success: ', res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log('notice.vue fetchData fail: ', err);
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
