<template>
  <el-card class="changePwd-card">
    <el-form
      ref="pwdFormRef"
      :label-position="'top'"
      label-width="100px"
      :model="pwdForm"
      :rules="rules"
      class="form-wrapper"
    >
      <el-form-item label="原密码" prop="oldPwd">
        <el-input
          v-model="pwdForm.oldPwd"
          placeholder="输入"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input
          v-model="pwdForm.newPwd"
          placeholder="输入"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认新密码" prop="reNewPwd">
        <el-input
          v-model="pwdForm.reNewPwd"
          placeholder="输入"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitPwdChange(pwdFormRef)">
          提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { changePwd } from '/@/api/user';
import { getLocalUserId, getToken } from '/@/utils/auth';
const pwdFormRef = ref<FormInstance>();

const pwdForm = reactive({
  oldPwd: '',
  newPwd: '',
  reNewPwd: '',
});

const validateNewPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入新密码'));
  } else if (pwdForm.oldPwd === value) {
    callback(new Error('与原密码一致，请重新输入'));
  } else {
    if (pwdForm.reNewPwd !== '') {
      if (!pwdFormRef.value) return;
      pwdFormRef.value.validateField('newPwd', () => null);
    }
    callback();
  }
};

const validateReNewPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再输入一遍新密码!'));
  } else if (value !== pwdForm.newPwd) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPwd: [{ validator: validateNewPass, trigger: 'blur' }],
  reNewPwd: [{ validator: validateReNewPass, trigger: 'blur' }],
});

const submitPwdChange = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
      let header = {
        userid: getLocalUserId(),
        token: getToken(),
      };
      let data = {
        old_password: pwdForm.oldPwd,
        password: pwdForm.newPwd,
      };
      changePwd(data, header);
      console.log('post!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
</script>

<style scoped>
.changePwd-card {
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
