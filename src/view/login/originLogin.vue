<template>
  <el-container>
    <el-header style="height: 70px; padding: 0">
      <LoginHeadBar />
    </el-header>
    <el-main
      style="
        padding: 0;
        display: flex;
        align-items: stretch;
        justify-content: stretch;
      "
    >
      <div id="login" class="login">
        <div id="contain" class="contain">
          <div id="login-left-card" class="login-left-card">
            <el-card id="el-card" :shadow="false">
              <el-form id="textForm" class="textForm">
                <el-form-item id="title" class="intro_title">
                  Our Introduction
                </el-form-item>
                <el-form-item id="content" class="intro_content">
                  Xxxxxxxxxxxxxxxxxxxxxxxxx
                </el-form-item>
              </el-form>
              <div class="intro_func">
                <div class="compass">
                  <Compass />
                </div>
                <div class="intro_func_content">
                  <div class="func_title">Func</div>
                  <div class="func_content">Introduction of func</div>
                </div>
              </div>
              <div class="intro_func">
                <div class="compass">
                  <Compass />
                </div>
                <div class="intro_func_content">
                  <div class="func_title">Func</div>
                  <div class="func_content">Introduction of func</div>
                </div>
              </div>
              <div class="intro_func">
                <div class="compass">
                  <Compass />
                </div>
                <div class="intro_func_content">
                  <div class="func_title">Func</div>
                  <div class="func_content">Introduction of func</div>
                </div>
              </div>
            </el-card>
          </div>
          <div id="login-right-card" class="login-right-card">
            <el-card id="el-card" :shadow="false">
              <div class="image-container">
                <ChatDotRound
                  style="
                    width: 100%; /* 将图像设置为容器的宽度 */
                    height: 100%; /* 将图像设置为容器的高度 */
                    object-fit: cover; /* 设置图像裁剪为cover，以便图像可以填充整个容器 */
                    position: absolute; /* 将图像设置为绝对定位 */
                    top: 50%; /* 将图像的顶部与容器顶部垂直居中 */
                    left: 50%; /* 将图像的左侧与容器左侧水平居中 */
                    transform: translate(-50%, -50%) scale(0.8);
                    color: #9007ff;
                  "
                />
              </div>
              <div style="font-size: 30px; font-weight: bold; margin: 10px">
                欢迎使用
              </div>
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
                    id="loginButton"
                    @click="userLogin('ruleForm')"
                    style="
                      height: 45px;
                      border-radius: 10px;
                      margin: 10px 0 0 0;
                    "
                    >登录
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <div id="links-container">
                    <el-link
                      type="primary"
                      @click="changeRegister()"
                      class="link"
                      >注册账号
                    </el-link>
                    <el-link type="primary" @click="userForget()" class="link"
                      >忘记密码</el-link
                    >
                  </div>
                </el-form-item>
              </el-form>
              <el-form
                id="loginForms"
                class="registerForm"
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
            </el-card>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {
  ChatDotRound,
  User,
  Lock,
  Connection,
  Compass,
} from '@element-plus/icons-vue';
import { useUserStore } from '/@/store/index.js';
import { reactive, ref } from 'vue';
import router from '/@/router/index.js';
import LoginHeadBar from '/@/view/login/LoginHeadBar.vue';

export default {
  name: 'userLogin',
  components: { LoginHeadBar, Compass, ChatDotRound },
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
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: url('src\/assets\/login_background.jpg');
  display: flex;
  justify-content: center;
}

.contain {
  height: 600px;
  width: 850px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
}

.image-container {
  display: inline-block; /* 将容器设置为行内块，以便可以在其中包含图像 */
  margin: 10px; /* 添加外边距 */
  padding: 0; /* 取消容器的内边距 */
  box-sizing: border-box; /* 设置盒模型为border-box，以便边框宽度不会增加元素的宽度 */
  width: 60px; /* 设置容器宽度 */
  height: 60px; /* 设置容器高度 */
  border: #9007ff solid 5px;
  border-radius: 15%;
  position: relative;
}

.login-left-card {
  background-color: #9007ff;
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  #el-card {
    background-color: #9007ff;
    border: none;
    .textForm {
      width: 300px;
      color: #ffffff;
      justify-content: left;
      align-items: flex-start;
    }
  }
}

.intro_title {
  margin-bottom: 40px;
}

.intro_title :deep(.el-form-item__content) {
  font-size: 28px; /* 设置字体大小为 24px */
  font-weight: bold; /* 设置字体粗细为加粗 */
}

.intro_content :deep(.el-form-item__content) {
  font-size: 16px; /* 设置字体大小为 16px */
  font-family: Arial, sans-serif; /* 设置字体样式为 Arial, sans-serif */
  line-height: 1.5; /* 设置行高为 1.5 */
}

.compass {
  width: 4em;
  height: 4em;
  color: white;
  border-radius: 10px;
  border: 5px solid white;
}

.intro_func {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 100%;
  margin-bottom: 15px;
}

.intro_func_content {
  margin-left: 20px;
  height: 4em;
}

.func_title {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 20px;
  color: white;
  font-weight: bold;
  margin-top: 0;
}

.func_content {
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 10px;
}

.login-right-card {
  background-color: #ffffff;
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  #el-card {
    display: flex;
    border: none;
  }
}

.loginForm {
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

.login-text {
  height: 50px;
  margin: 10px 0 10px 0;
}

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
