<template>
  <div id="login" class="login">
    <div id="contain" class="contain">
      <div id="login-left-card" class="login-left-card">
        <el-card id="el-card" :shadow="false">
          <el-form id="textForm" class="textForm">
            <el-form-item>
              <h3>Our Introductions</h3>
            </el-form-item>
            <el-form-item>
              <span>Xxxxxxxxxxxxxxxxxxxxxxxxx</span>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      <div id="login-right-card" class="login-right-card">
        <el-card id="el-card" :shadow="false">
          <div id="message-icon">
            <ChatDotRound style="width: 2em; height: 2em" />
          </div>
          <h2>欢迎使用</h2>
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
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button id="loginButton" @click="userLogin('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
            <el-form-item>
              <div id="links-container">
                <el-link type="primary" @click="changeRegister()"
                  >注册账号</el-link
                >
                <el-link type="primary" @click="userForget()">忘记密码</el-link>
              </div>
            </el-form-item>
          </el-form>
          <el-form
            id="loginForms"
            class="loginForm"
            :model="registerForm"
            :rules="registerRules"
            v-else-if="formStatus === 'register'"
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
              <el-button id="loginButton" @click="userRegister('ruleForm')"
                >注册</el-button
              >
            </el-form-item>
            <el-form-item>
              <div id="links-container">
                <el-link type="primary" @click="changeLogin()"
                  >已有账号</el-link
                >
                <el-link type="primary" @click="userForget()">忘记密码</el-link>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ChatDotRound, User, Lock, Connection } from '@element-plus/icons-vue';
import { useUserStore } from '/@/store/index.js';
import { reactive, ref } from 'vue';
import router from '/@/router/index.js';

export default {
  name: 'userLogin',
  components: { ChatDotRound },
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
      loginForm,
      registerForm,
      formStatus: ref('login'),
      loginRules: reactive({
        username: [
          { required: true, message: '您还没有输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '您还没有输入密码', trigger: 'blur' },
        ],
      }),
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
              path: '/home',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
            this.loginForm.username = this.registerForm.username;
            this.loginForm.password = this.registerForm.password;
            this.userLogin();
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
      this.formStatus = 'register';
    },
    changeLogin() {
      this.formStatus = 'login';
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-image: url('src\/assets\/login_background.jpg');
  .contain {
    height: 450px;
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.contain {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  .login-left-card {
    background-color: #a426ff;
    width: 300px;
    height: 100%;
  }
  .login-right-card {
    background-color: #ffffff;
    width: 300px;
    height: 100%;
  }
}

.login-left-card {
  display: flex;
  justify-content: center;
  align-items: center;
  #el-card {
    background-color: #a426ff;
    border: none;
    .textForm {
      color: #ffffff;
      justify-content: center;
      align-items: center;
    }
  }
}

.login-right-card {
  display: flex;
  justify-content: center;
  align-items: center;
  #el-card {
    display: flex;
    border: none;
    .loginForm {
      width: 250px;
      justify-content: center;
      align-items: center;
      #loginButton {
        width: 100%;
        background-color: #a426ff;
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
  }
}
</style>
