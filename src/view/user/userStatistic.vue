<template>
  <el-card class="info-card">
    <el-form
      ref="infoFormRef"
      :label-position="'top'"
      label-width="100px"
      class="form-wrapper"
    >
      <el-scrollbar max-height="42vh">
        <el-form-item label="积分" prop="none">
          <el-input
            :placeholder="String(oldPoint)"
            autocomplete="off"
            disabled="disabled"
          />
        </el-form-item>
      </el-scrollbar>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { useUserStore } from '/@/store';

export default {
  name: 'userStat',
  data() {
    return {
      Point: undefined,
    };
  },
  computed: {
    oldPoint() {
      return this.Point;
    },
  },
  methods: {
    async fetchData() {
      try {
        this.Point = useUserStore().point;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // 根据需要处理错误
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.info-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: none;
}
.form-wrapper {
  width: 35vw;
}
.form-wrapper:deep(.el-form-item__label) {
  font-size: 17px;
  font-weight: bold;
}
</style>
