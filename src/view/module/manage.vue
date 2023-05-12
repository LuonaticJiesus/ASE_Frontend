<template>
  <el-table :data="tableData" stripe style="width: 100%" height="58vh">
    <el-table-column prop="fig" label="" width="20" />
    <el-table-column prop="name" label="昵称" width="150" />
    <el-table-column prop="card_id" label="学工号" width="150" />
    <el-table-column prop="point" label="积分" width="100" />
    <el-table-column prop="approve_permission" label="当前权限" width="120" />
    <el-table-column prop="approve_permission" label="操作">
      <template #default="{ row }">
        <el-button
          plain
          type="danger"
          :disabled="userRole >= 2 && userRole > row.approve_permission"
        >
          <el-icon><Delete /></el-icon>
          移除
        </el-button>
        <el-button
          plain
          type="success"
          :disabled="
            userRole >= 3 &&
            (row.approve_permission === 1 || row.approve_permission === 0)
          "
        >
          <span>设为助手</span>
        </el-button>
        <el-button
          plain
          type="primary"
          :disabled="userRole >= 2 && row.approve_permission === 0"
        >
          <span>允许发帖</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import router from '/@/router';
import { moduleMembers } from '/@/api/module';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { Delete } from '@element-plus/icons-vue';
import { queryRole } from '/@/api/permission';
interface member {
  name: string;
  point: number;
  approve_permission: number;
}

const tableData: Ref<Array<member>> = ref([]);
const userRole = ref(2);
const fetchData = async () => {
  console.log('fetchData...', this);
  const block_id = router.currentRoute.value.params['id'];
  return moduleMembers(block_id, -1, getLocalUserId(), getToken());
};

const getUserRole = async () => {
  const block_id = router.currentRoute.value.params['id'];
  if (block_id) {
    return await queryRole(block_id);
  }
  return undefined;
};

onMounted(async () => {
  tableData.value = await fetchData();
  userRole.value = await getUserRole();
});
</script>

<script lang="ts">
export default {
  name: 'ModuleMangeView.vue',
};
</script>
<style scoped></style>
