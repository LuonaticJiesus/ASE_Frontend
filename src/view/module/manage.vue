<template>
  <el-table :data="tableData" stripe style="width: 100%" height="58vh">
    <el-table-column prop="fig" label="" width="20" />
    <el-table-column prop="name" label="昵称" width="150" />
    <el-table-column prop="card_id" label="学工号" sortable width="150" />
    <el-table-column prop="point" label="积分" sortable width="100" />
    <el-table-column
      prop="approve_permission"
      label="身份"
      sortable
      width="140"
    >
      <template #default="{ row }">
        <el-tag
          :type="permissionColor[row.approve_permission]"
          v-show="row.approve_permission >= 0"
        >
          {{
            // noinspection TypeScriptUnresolvedReference
            permissionMap[row.approve_permission]
          }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="approve_permission" label="操作">
      <template #default="{ row }">
        <!--        <el-button-->
        <!--          plain-->
        <!--          type="danger"-->
        <!--          :disabled="canDelete(row.approve_permission)"-->
        <!--          @click="setPermission(row.user_id, -1)"-->
        <!--        >-->
        <!--          <el-icon><Delete /></el-icon>-->
        <!--          移除-->
        <!--        </el-button>-->
        <el-button
          v-if="row.approve_permission < 2"
          plain
          size="small"
          type="success"
          :disabled="canSetAssistant(row.approve_permission)"
          @click="setPermission(row.user_id, 2)"
        >
          <el-icon><Check /></el-icon>
          <span>设为助手</span>
        </el-button>
        <el-button
          v-else
          plain
          size="small"
          type="success"
          :disabled="canCancelAssistant(row.approve_permission)"
          @click="setPermission(row.user_id, 1)"
        >
          <el-icon><Close /></el-icon>
          <span>取消助手</span>
        </el-button>
        <el-button
          v-if="row.approve_permission < 1"
          plain
          size="small"
          type="primary"
          :disabled="canSetPost(row.approve_permission)"
          @click="setPermission(row.user_id, 1)"
        >
          <el-icon><Check /></el-icon>
          <span>允许发帖</span>
        </el-button>
        <el-button
          v-else
          plain
          size="small"
          type="primary"
          :disabled="canCancelPost(row.approve_permission)"
          @click="setPermission(row.user_id, 0)"
        >
          <el-icon><Close /></el-icon>
          <span>禁止发帖</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import router from '/@/router';
import { moduleMembers, moduleSetPermission } from '/@/api/module';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { Check, Close } from '@element-plus/icons-vue';
import { permissionColor, permissionMap, queryRole } from '/@/api/permission';
interface member {
  name: string;
  point: number;
  approve_permission: number;
}

const tableData: Ref<Array<member>> = ref([]);
const userRole = ref(2);

const headers = { token: getToken(), userid: getLocalUserId() };
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

const canSetAssistant = (role) => {
  return !(userRole.value >= 3 && (role === 1 || role === 0));
};

const canCancelAssistant = (role) => {
  return !(userRole.value >= 3 && role === 2);
};

const canSetPost = (role) => {
  return !(userRole.value >= 2 && role === 0);
};

const canCancelPost = (role) => {
  return !(userRole.value >= 2 && role === 1);
};

const setPermission = async (user_id, permission) => {
  const block_id = router.currentRoute.value.params['id'];
  await moduleSetPermission(headers, block_id, user_id, permission);
  location.reload();
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
