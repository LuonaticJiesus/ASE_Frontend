<template>
  <div style="padding: 0">
    <el-table :data="tableData" stripe style="width: 100%" height="58vh">
      <el-table-column prop="fig" label="" width="20" />
      <el-table-column prop="name" label="昵称" width="280" />
      <el-table-column prop="card_id" label="学工号" sortable />
      <el-table-column prop="point" label="积分" sortable />
      <el-table-column prop="approve_permission" label="身份" sortable>
        <template #default="{ row }">
          <el-tag type="success" v-show="row.approve_permission > 1">
            {{
              row.approve_permission === 2
                ? 'Assistant'
                : row.approve_permission === 3
                ? 'Manager'
                : row.approve_permission === 4
                ? 'SuperManger'
                : 'None'
            }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { moduleMembers } from '/@/api/module.js';
import router from '/@/router/index.js';
import { getLocalUserId, getToken } from '/@/utils/auth';

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
      const block_id = router.currentRoute.value.params['id'];
      moduleMembers(block_id, -1, getLocalUserId(), getToken())
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
