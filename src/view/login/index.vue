<template>
  <el-form
    :model="loginForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="账号" prop="text">
      <el-input
        type="text"
        v-model="loginForm.userId"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        v-model="loginForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="userLogin('ruleForm')">登录</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="userRegister()">注册账号</el-button>
      <el-button @click="userForget()">忘记密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import HelloWorld from '/@/App.vue';

import { login } from '/@/api/user.js';

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.loginForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      loginForm: {
        userId: '',
        password: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
      },
    };
  },
  methods: {
    userLogin(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          let data = {
            userName: this.loginForm.userId,
            password: this.loginForm.password,
          };
          login(data);
        } else {
          return false;
        }
      });
    },
    userRegister() {
      this.$router.push({
        name: 'Register',
      });
    },
  },
  name: 'userLogin',
};
</script>

<style scoped></style>
