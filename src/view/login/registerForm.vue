<template>
  <el-form
    class="registerForm"
    ref="ruleFormRef"
    :model="registerForm"
    :rules="registerRules"
  >
    <el-form-item prop="email">
      <el-input
        v-model="registerForm.email"
        type="text"
        placeholder="请输入您的邮箱"
        :prefix-icon="User"
        class="login-text"
      ></el-input>
    </el-form-item>
    <el-form-item prop="username">
      <el-input
        v-model="registerForm.username"
        type="text"
        placeholder="请输入您的账号"
        :prefix-icon="User"
        class="login-text"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="registerForm.password"
        type="password"
        placeholder="密码【8-16字符，包含字母数字】"
        :prefix-icon="Lock"
        show-password
        class="login-text"
      ></el-input>
    </el-form-item>
    <el-form-item prop="confirm">
      <el-input
        v-model="registerForm.confirm"
        type="password"
        placeholder="确认密码"
        :prefix-icon="Lock"
        show-password
        class="login-text"
      ></el-input>
    </el-form-item>
    <div class="loginButtonContainer">
      <el-form-item>
        <el-button
          class="loginButton"
          @click="userRegister()"
          @keyup.enter="keyDown()"
          >注册
        </el-button>
      </el-form-item>
    </div>
    <el-form-item>
      <div class="links-container">
        <el-link
          type="primary"
          @click="changeLogin()"
          class="link"
          :underline="false"
          >已有账号
        </el-link>
        <el-link
          type="primary"
          @click="userForget()"
          class="link"
          :underline="false"
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
import { ElMessage, ElNotification } from 'element-plus';
import 'element-plus/theme-chalk/el-notification.css';
import 'element-plus/theme-chalk/el-message.css';

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
        email: [
          { required: true, message: '您还没有输入邮箱', trigger: 'blur' },
          {
            pattern: '^[a-zA-Z0-9_-]+@buaa[.]edu[.]cn$',
            message: '请输入北航邮箱',
          },
        ],
        username: [
          { required: true, message: '您还没有输入账号', trigger: 'blur' },
          {
            pattern: '^[\u4e00-\u9fa5a-zA-Z0-9]{5,20}$',
            message: '请输入包含字母、数字和汉字的5-20位账号',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '您还没有输入密码', trigger: 'blur' },
          {
            pattern: '\^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}\$',
            message: '请输入包含字母和数字的8-16位密码',
            trigger: 'blur',
          },
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
    async userRegister() {
      try {
        const isValid = await this.$refs.ruleFormRef.validate();
        if (isValid) {
          console.log('register validate');
          let data = {
            name: this.registerForm.username,
            password: this.registerForm.password,
            card_id: this.registerForm.card,
            phone: this.registerForm.phone,
            email: this.registerForm.email,
          };
          for (const key in data) {
            if (
              data[key] === null ||
              data[key] === '' ||
              data[key] === undefined
            ) {
              delete data[key];
            }
          }
          const userStore = useUserStore();
          userStore
            .register(data)
            .then(async (res) => {
              console.log(res);
              if (res) {
                ElNotification({
                  title: this.registerForm.username,
                  message: '注册成功，请查收邮件进行验证！',
                });
                this.$emit('transfer', 'login');
              }
            })
            .catch((err) => {
              console.log(err);
              ElNotification({
                title: this.registerForm.username,
                message: '注册失败，请检查网络环境或联系管理员。',
              });
            });
        }
      } catch (err) {
        console.log('register validate error');
        ElNotification({
          message: '注册失败，表单校验不通过，请检查输入是否符合规则',
          type: 'error',
        });
      }
    },
    userForget() {
      ElMessage({
        showClose: true,
        message: '请联系管理员找回密码 !',
        type: 'error',
      });
    },
    changeLogin() {
      this.$emit('transfer', 'login');
    },
    keyDown(e) {
      if (e.keyCode === 13) {
        this.userRegister();
      }
    },
  },
  mounted() {
    //绑定事件
    window.addEventListener('keydown', this.keyDown);
  },
  //销毁事件
  unmounted() {
    window.removeEventListener('keydown', this.keyDown, false);
  },
};
</script>

<style scoped>
.registerForm {
  width: 250px;
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
  height: 35px;
  border-radius: 10px;
  &:hover {
    filter: brightness(1.1);
  }
}

.loginButtonContainer :deep(.el-form-item) {
  margin-bottom: 0;
}

.links-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 设置链接之间的间距 */
}

.login-text {
  height: 30px;
  margin: 0;
}

.link {
  font-size: 16px;
  color: #9007ff;
  margin-top: 5px;
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
