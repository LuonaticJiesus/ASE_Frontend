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
        <el-button
          class="submit-button"
          plain
          color="white"
          :dark="false"
          @click="submitPwdChange(pwdFormRef)"
        >
          提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { changePwd, getPublicKey } from '/@/api/user';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { JSEncrypt } from 'jsencrypt';

const pwdFormRef = ref<FormInstance>();

const pwdForm = reactive({
  oldPwd: '',
  newPwd: '',
  reNewPwd: '',
});

let publicKey = ref('');

const validateNewPass = (rule: any, value: any, callback: any) => {
  if (pwdForm.oldPwd === value) {
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
  if (value !== pwdForm.newPwd) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      validator: validateNewPass,
      trigger: 'blur',
    },
  ],
  reNewPwd: [
    { required: true, message: '请重复输入一遍新密码', trigger: 'blur' },
    { validator: validateReNewPass, trigger: 'blur' },
  ],
});

const submitPwdChange = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('change pwd');
      const userid = getLocalUserId();
      const token = getToken();
      const old_password = encryptedData(pwdForm.oldPwd);
      const password = encryptedData(pwdForm.newPwd);
      console.log(old_password, password, userid, token);
      await changePwd(old_password, password, userid, token);
      ElMessage.success({
        showClose: true,
        duration: 2000,
        message: '修改密码成功!',
      });
      cleanForm();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

onMounted(async () => {
  await getPublicKey().then((res) => {
    publicKey.value = res.public_key;
  });
});

const cleanForm = () => {
  pwdFormRef.value.resetFields();
};

// 加密函数
const encryptedData = (pwd) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey.value);
  return encryptor.encrypt(pwd);
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
  width: 35vw;
}

.form-wrapper:deep(.el-form-item__label) {
  font-size: 17px;
  font-weight: bold;
}

.form-button {
  display: flex;
  float: right;
}

.form-button :deep(.el-button) {
  background: #9007ff;
  border-color: #9007ff;
}

.submit-button {
  width: 7vw;
  height: 4vh;
  border-radius: 12px;
  background-color: rgb(130, 36, 227);
  background-image: linear-gradient(
    90deg,
    rgb(130, 36, 227) 0px,
    rgb(169, 104, 236)
  );
  box-shadow: rgba(130, 36, 227, 0.5) 0 1px 2px 0;
  font-size: medium;
}
</style>
