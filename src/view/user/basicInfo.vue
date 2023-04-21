<template>
  <el-card class="info-card">
    <el-form
      ref="infoFormRef"
      :label-position="'top'"
      label-width="100px"
      :model="infoForm"
      :rules="rules"
      class="form-wrapper"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="infoForm.username"
          placeholder="当前用户名"
          style="max-width: 460px"
        />
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="infoForm.userName"
          placeholder="输入"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="infoForm.email"
          placeholder="当前邮箱"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input
          v-model="infoForm.studentId"
          placeholder="学号:绑定后不可修改"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="infoForm.name"
          placeholder="姓名:绑定后不可修改"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitUserInfoChange(infoFormRef)">
          提交修改
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitUserInfoChange(infoFormRef)">
          提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { useUserStore } from '/@/store';

export default {
  name: 'basicInfo',
  data() {
    const userStore = useUserStore();
    return {
      userName: userStore.username,
      // email: userStore.email,
    };
  },
};
</script>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const infoFormRef = ref<FormInstance>();

const infoForm = reactive({
  username: '',
  userName: '',
  email: '',
  studentId: '',
  name: '',
});

const validateUserName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else {
    callback();
  }
};

const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入邮箱'));
  } else {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!pattern.test(value)) {
      callback(new Error('请输入正确的邮箱地址'));
    } else {
      callback();
    }
  }
};

const validateStudentId = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入学号'));
  } else {
    const pattern = /^\d{8}$/;
    if (!pattern.test(value)) {
      callback(new Error('请输入正确的学号'));
    } else {
      callback();
    }
  }
};

const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入姓名'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  userName: [{ validator: validateUserName, trigger: 'blur' }],
  email: [{ validator: validateEmail, trigger: 'blur' }],
  studentId: [{ validator: validateStudentId, trigger: 'blur' }],
  name: [{ validator: validateName, trigger: 'blur' }],
});

const submitUserInfoChange = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
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
  width: 460px;
}
.form-wrapper:deep(.el-form-item__label) {
  font-size: 20px;
  font-weight: bold;
}
.form-button {
  display: flex;
  float: right;
}
</style>
