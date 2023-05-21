<template>
  <el-card class="info-card">
    <el-form
      ref="infoFormRef"
      :label-position="'top'"
      label-width="100px"
      :model="infoForm"
      :rules="rules"
      class="form-wrapper"
    >
      <el-scrollbar max-height="42vh">
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="infoForm.email"
            :placeholder="oldEmail"
            autocomplete="off"
            disabled="disabled"
          />
        </el-form-item>
        <el-form-item label="学号" :prop="idProp">
          <el-input
            v-model="infoForm.studentId"
            :placeholder="oldStudentId"
            autocomplete="off"
            :disabled="this.idStatus"
          />
        </el-form-item>
        <el-form-item label="手机号" :prop="phoneProp">
          <el-input
            v-model="infoForm.phone"
            :placeholder="oldPhone"
            autocomplete="off"
            :disabled="this.phoneStatus"
          />
        </el-form-item>
      </el-scrollbar>
      <el-form-item class="form-button">
        <el-button
          class="submit-button"
          plain
          color="white"
          :dark="false"
          @click="submitUserInfoChange(infoFormRef)"
        >
          提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { getLocalUserId, getToken } from '/@/utils/auth';
import { reactive, ref } from 'vue';
import { changeBasicInfo, getUserProfile } from '/@/api/user';
import { FormInstance, FormRules } from 'element-plus';

export default {
  name: 'basicInfo',
  data() {
    return {
      UserName: '',
      Email: '',
      Phone: '',
      Studentid: '',
    };
  },
  computed: {
    oldUsername() {
      return this.UserName;
    },
    oldEmail() {
      if (this.Email === undefined) return '请输入邮箱';
      else return this.Email;
    },
    oldStudentId() {
      if (this.Studentid === undefined) {
        return '请输入学号';
      } else {
        return this.Studentid;
      }
    },
    oldPhone() {
      if (this.Phone === undefined) {
        return '请输入手机号';
      } else {
        return this.Phone;
      }
    },
    idProp() {
      if (this.Studentid === undefined) return 'studentId';
      else return 'none';
    },
    phoneProp() {
      if (this.Phone === undefined) return 'phone';
      else return 'none';
    },
  },
  setup() {
    const idStatus = ref(false);
    const phoneStatus = ref(false);
    const infoFormRef = ref<FormInstance>();
    const infoForm = reactive({
      username: '',
      email: '',
      studentId: '',
      phone: '',
    });
    const header = {
      userid: getLocalUserId(),
      token: getToken(),
    };

    const rules = reactive<FormRules>({
      username: [{ required: true, message: '请输入用户名' }],
      email: [
        { required: true, message: '请输入邮箱' },
        { type: 'email', message: '请输入正确的邮箱地址' },
      ],
      studentId: [
        { required: true, message: '请输入学号' },
        { pattern: '\^\\d{8}\$', message: '请输入正确的学号' },
      ],
      phone: [
        { required: true, message: '请输入手机号' },
        { pattern: '\^1[3456789]\\d{9}\$', message: '请输入正确的11位手机号' },
      ],
    });

    const submitUserInfoChange = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!');
          let data = {
            card_id: infoForm.studentId,
            phone: infoForm.phone,
            email: infoForm.email,
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
          changeBasicInfo(data, header);
          idStatus.value = true;
          phoneStatus.value = true;
        } else {
          console.log('error submit!');
          return false;
        }
      });
    };
    return {
      idStatus,
      phoneStatus,
      infoForm,
      infoFormRef,
      rules,
      submitUserInfoChange,
    };
  },
  methods: {
    async fetchData() {
      try {
        const userProfile = await getUserProfile({
          userid: getLocalUserId(),
          token: getToken(),
        });
        console.log(userProfile);
        this.UserName = userProfile.name;
        this.Email = userProfile.email;
        this.Studentid = userProfile.card_id;
        this.Phone = userProfile.phone;
        if (this.Studentid !== undefined) {
          this.idStatus = true;
        }
        if (this.Phone !== undefined) {
          this.phoneStatus = true;
        }
        console.log('change');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // 根据需要处理错误
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.info-card {
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
