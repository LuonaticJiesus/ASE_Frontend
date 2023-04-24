<template>
  <el-form
    id="registerForm"
    class="registerForm"
    :model="registerForm"
    :rules="registerRules"
  >
    <el-form-item prop="username">
      <el-input
        v-model="registerForm.username"
        type="text"
        placeholder="请输入您的账号"
        :prefix-icon="User"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="registerForm.password"
        type="password"
        placeholder="密码【8-16字符，包含字母数字】"
        :prefix-icon="Lock"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item prop="confirm">
      <el-input
        v-model="registerForm.confirm"
        type="password"
        placeholder="确认密码"
        :prefix-icon="Lock"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input
        v-model="registerForm.phone"
        type="phone"
        placeholder="绑定手机号【可选】"
        :prefix-icon="Connection"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        v-model="registerForm.email"
        type="email"
        placeholder="绑定邮箱【可选】"
        :prefix-icon="Connection"
      ></el-input>
    </el-form-item>
    <el-form-item prop="card">
      <el-input
        v-model="registerForm.card"
        type="text"
        placeholder="绑定学号【可选】"
        :prefix-icon="Connection"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        id="loginButton"
        @click="userRegister('ruleForm')"
        style="height: 40px; border-radius: 10px"
        >注册
      </el-button>
    </el-form-item>
    <el-form-item>
      <div id="links-container">
        <el-link type="primary" @click="changeLogin()" class="link"
          >已有账号
        </el-link>
        <el-link type="primary" @click="userForget()" class="link"
          >忘记密码</el-link
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { User, Lock, Connection } from '@element-plus/icons-vue';
import { useUserStore } from '/@/store/index.js';
import { reactive, ref } from 'vue';
import router from '/@/router/index.js';

export default {
  name: 'registerForm',
  computed: {
    User() {
      return User;
    },
    Lock() {
      return Lock;
    },
    Connection() {
      return Connection;
    },
  },
  setup() {
    const registerForm = reactive({
      username: '',
      password: '',
      confirm: '',
      email: '',
      phone: '',
      card: '',
    });
    const validateConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('您还没有确认密码'));
      } else {
        if (registerForm.confirm !== registerForm.password) {
          callback(new Error('两次输入密码不同'));
        } else {
          callback();
        }
      }
    };
    return {
      registerForm,
      formStatus: ref('login'),
      registerRules: reactive({
        username: [
          { required: true, message: '您还没有输入账号', trigger: 'blur' },
          { min: 5, max: 20, message: '账号限定5-20个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '您还没有输入密码', trigger: 'blur' },
        ],
        confirm: [
          { required: true, message: '您还没有确认密码', trigger: 'blur' },
          { validator: validateConfirm, trigger: 'blur' },
        ],
        card: [],
      }),
    };
  },
  methods: {
    userRegister() {
      let data = {
        name: this.registerForm.username,
        password: this.registerForm.password,
        card_id: this.registerForm.card,
        phone: this.registerForm.phone,
        email: this.registerForm.email,
      };
      for (const key in data) {
        if (data[key] === null || data[key] === '' || data[key] === undefined) {
          delete data[key];
        }
      }
      const userStore = useUserStore();
      userStore
        .register(data)
        .then(async (res) => {
          console.log(res);
          if (res) {
            // this.loginForm.username = this.registerForm.username;
            // this.loginForm.password = this.registerForm.password;
            // this.userLogin();
            await router.push({
              path: 'login',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    userForget() {
      return 1;
    },
    changeLogin() {
      this.$emit('transfer', 'login');
      // this.formStatus = 'login';
    },
  },
};
</script>

<style scoped>
.registerForm {
  width: 300px;
  justify-content: center;
  align-items: center;
  #loginButton {
    width: 100%;
    background-color: #9007ff;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
  }
  #links-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px; /* 设置链接之间的间距 */
  }
}

.link {
  color: #9007ff;
}

.link :hover {
  color: #9007ff;
}

.link :deep(.text-decoration) {
  color: #9007ff;
}

.link :active {
  color: #9007ff;
}
</style>
