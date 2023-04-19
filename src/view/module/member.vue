<template>
  <div style="padding: 0">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="昵称" width="150" />
      <el-table-column prop="point" label="权限" />
    </el-table>
  </div>
</template>

<script>
import { moduleMembers } from '/@/api/module.js';

export default {
  name: 'MemberView',
  components: {},
  data: () => {
    return {
      tableData: [
        {
          // eslint-disable-next-line camelcase
          user_id: 123,
          name: 'xxx',
          // eslint-disable-next-line camelcase
          card_id: 'xxx',
          point: 10,
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
      moduleMembers(0, 0, 0, '')
        .then((res) => {
          console.log('member.vue fetchData success: ', res);
          this.tableData = res;
        })
        .catch((err) => {
          console.log('member.vue fetchData fail: ', err);
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
