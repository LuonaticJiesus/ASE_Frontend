<template>
  <el-container style="height: 100vh">
    <el-header style="height: 11vh; padding: 0">
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
        <div class="mask"></div>
        <div id="contain" class="contain">
          <div id="login-left-card" class="login-left-card">
            <el-card shadow="never">
              <el-form id="textForm" class="textForm">
                <el-form-item id="title" class="intro_title">
                  QuadSSSS
                </el-form-item>
                <el-form-item id="content" class="intro_content">
                  Subscription·Sharing·Syncretism·Success
                </el-form-item>
              </el-form>
              <div class="intro_func">
                <div class="compass">
                  <Compass />
                </div>
                <div class="intro_func_content">
                  <div class="func_title">Subscription</div>
                  <div class="func_content">订阅：抓住你感兴趣的一切</div>
                </div>
              </div>
              <div class="intro_func">
                <div class="compass">
                  <Compass />
                </div>
                <div class="intro_func_content">
                  <div class="func_title">Sharing</div>
                  <div class="func_content">分享：向世界表达自己</div>
                </div>
              </div>
              <div class="intro_func">
                <div class="compass">
                  <Compass />
                </div>
                <div class="intro_func_content">
                  <div class="func_title">Syncretism</div>
                  <div class="func_content">融合：交流产生智慧</div>
                </div>
              </div>
              <div class="intro_func">
                <div class="compass">
                  <Compass />
                </div>
                <div class="intro_func_content">
                  <div class="func_title">Success</div>
                  <div class="func_content">成功：互助走向成功</div>
                </div>
              </div>
            </el-card>
          </div>
          <div class="login-right-card">
            <el-card id="el-card" shadow="never">
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
              <div
                style="font-size: 25px; font-weight: bold; margin: 10px 0 20px"
              >
                欢迎使用
              </div>
              <div v-if="formStatus === 'login'" style="height: 250px">
                <login-form @transfer="changeStatus" />
              </div>
              <div v-else-if="formStatus === 'register'" style="height: 250px">
                <register-form @transfer="changeStatus" />
              </div>
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
import { ref } from 'vue';
import LoginHeadBar from '/@/view/login/LoginHeadBar.vue';
import LoginForm from '/@/view/login/loginForm.vue';
import RegisterForm from '/@/view/login/registerForm.vue';

export default {
  name: 'LoginPage',
  components: { RegisterForm, LoginForm, LoginHeadBar, Compass, ChatDotRound },
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
    return {
      formStatus: ref('login'),
    };
  },
  methods: {
    changeStatus(msg) {
      this.formStatus = msg;
    },
  },
};
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: none;
  z-index: 0;
}

.login {
  position: relative;
  width: 100%;
  height: 100%;
  /*background-image: url('/src/assets/login_background.jpg');*/
  background: linear-gradient(125deg, #9890e3, #66a6ff, #9007ff, #e2d1c3);
  background-size: 500%;
  /* 执行动画：动画名 时长 线性的 无限次播放 */
  animation: bgAnimation 15s linear infinite;
  display: flex;
  justify-content: center;
}

@keyframes bgAnimation {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.contain {
  height: 75vh;
  width: 48vw;
  margin-top: 50px;
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  z-index: 9999;
  border-radius: 5px;
}

.image-container {
  display: inline-block; /* 将容器设置为行内块，以便可以在其中包含图像 */
  margin: 0; /* 添加外边距 */
  padding: 0; /* 取消容器的内边距 */
  box-sizing: border-box; /* 设置盒模型为border-box，以便边框宽度不会增加元素的宽度 */
  width: 50px; /* 设置容器宽度 */
  height: 50px; /* 设置容器高度 */
  border: #9007ff solid 5px;
  border-radius: 15%;
  position: relative;
}

.login-left-card {
  background-color: rgba(30, 30, 30, 0.3);
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px 0 0 12px;
}

.login-left-card .el-card {
  background-color: rgba(144, 7, 255, 0);
  border: none;
}

.textForm {
  width: 300px;
  color: #ffffff;
  justify-content: left;
  align-items: flex-start;
}

.intro_title {
  margin-bottom: 20px;
}

.intro_title :deep(.el-form-item__content) {
  font-size: 24px; /* 设置字体大小为 24px */
  font-weight: bold; /* 设置字体粗细为加粗 */
}

.intro_content :deep(.el-form-item__content) {
  font-size: 14px; /* 设置字体大小为 16px */
  font-family: Arial, sans-serif; /* 设置字体样式为 Arial, sans-serif */
  line-height: 1.5; /* 设置行高为 1.5 */
}

.compass {
  width: 3em;
  height: 3em;
  color: white;
  border-radius: 10px;
  border: 5px solid white;
}

.intro_func {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 100%;
}

.intro_func_content {
  margin: 0 0 10px 20px;
  height: 4em;
}

.func_title {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin-top: 6px;
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
  background-color: rgba(255, 255, 255, 1);
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 12px 12px 0;
}

.login-right-card .el-card {
  display: flex;
  border: none;
  background-color: rgba(255, 255, 255, 0);
}
</style>
