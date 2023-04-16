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
              <span>Xxxxxxxxxxxxxxxxxxxxxxxxxx</span>
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
          <el-form id="loginForm" class="loginForm">
            <el-form-item prop="text">
              <el-input
                v-model="loginForm.userId"
                type="text"
                placeholder="请输入您的邮箱"
                :prefix-icon="User"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
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
                <el-link type="primary" @click="userRegister()"
                  >注册账号</el-link
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
// import HelloWorld from '/@/App.vue';

//import { login } from '/@/api/user.js';
import { ChatDotRound, User, Lock } from '@element-plus/icons-vue';
import { useUserStore } from '/@/store/index.js';

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
  },
  data() {
    return {
      loginForm: {
        userId: '',
        password: '',
      },
    };
  },
  methods: {
    userLogin() {
      let data = {
        username: this.loginForm.userId,
        password: this.loginForm.password,
      };
      const userStore = useUserStore();
      userStore
        .login(data)
        .then(async (res) => {
          console.log(res);
          if (res) {
            await userStore.getInfo(); // 更新登录状态和获取用户信息
            this.$router.push({
              name: 'home',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
