<template>
  <el-form
    id="loginForm"
    class="loginForm"
    :model="loginForm"
    :rules="loginRules"
    v-if="formStatus === 'login'"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        type="text"
        placeholder="请输入您的账号"
        :prefix-icon="User"
        class="login-text"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="请输入密码"
        :prefix-icon="Lock"
        show-password
        class="login-text"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        class="loginButton"
        @click="userLogin('ruleForm')"
        style="height: 45px; border-radius: 10px; margin: 10px 0 0 0"
        >登录
      </el-button>
    </el-form-item>
    <el-form-item>
      <div class="links-container">
        <el-link
          type="primary"
          @click="changeRegister()"
          class="link"
          :underline="false"
          >注册账号
        </el-link>
        <el-link
          type="primary"
          @click="userForget()"
          class="link"
          :underline="false"
          >忘记密码
        </el-link>
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
  name: 'loginForm',
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
    const loginForm = reactive({
      username: '',
      password: '',
    });
    return {
      loginForm,
      formStatus: ref('login'),
      loginRules: reactive({
        username: [
          { required: true, message: '您还没有输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '您还没有输入密码', trigger: 'blur' },
        ],
      }),
    };
  },
  methods: {
    userLogin() {
      let data = {
        name: this.loginForm.username,
        password: this.loginForm.password,
      };
      const userStore = useUserStore();
      userStore
        .login(data)
        .then(async (res) => {
          console.log(res);
          if (res) {
            await userStore.getInfo(); // 更新登录状态和获取用户信息
            await router.push({
              path: 'home',
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
    changeRegister() {
      this.$emit('transfer', 'register');
      // this.formStatus = 'register';
    },
  },
};
</script>

<style scoped>
.loginForm {
  width: 300px;
  justify-content: center;
  align-items: center;
}

.loginButton {
  width: 100%;
  background-color: #9007ff;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    filter: brightness(1.1);
  }
}

.links-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 设置链接之间的间距 */
}

.login-text {
  height: 50px;
  margin: 10px 0 10px 0;
}

.link {
  font-size: 16px;
  color: #9007ff;
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 0;
    height: 2px;
    background: #9007ff;
    transition: all 0.3s;
  }
  &:hover {
    filter: brightness(1.1);
  }
  &:hover:before {
    width: 100%;
    left: 0;
    right: 0;
  }
}
</style>
