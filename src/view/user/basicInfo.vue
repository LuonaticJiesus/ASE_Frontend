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
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="infoForm.username"
          :placeholder="oldUsername"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="infoForm.email"
          :placeholder="oldEmail"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input
          v-model="infoForm.studentId"
          :placeholder="oldStudentId"
          autocomplete="off"
          :disabled="this.idStatus"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="infoForm.phone"
          :placeholder="oldPhone"
          autocomplete="off"
          :disabled="this.phoneStatus"
        />
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitUserInfoChange(infoFormRef)">
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
      // if (this.userName === '') return '请输入用户名';
      // else return this.userName;
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
  },
  setup() {
    const infoFormRef = ref<FormInstance>();
    const infoForm = reactive({
      username: '',
      email: '',
      studentId: '',
      phone: '',
    });

    const idStatus = ref(false);
    const phoneStatus = ref(false);
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
        console.log(
          this.UserName,
          this.Studentid,
          this.Email,
          this.Phone,
          this.idStatus,
          this.phoneStatus,
        );
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
  width: 460px;
}
.form-wrapper:deep(.el-form-item__label) {
  font-size: 20px;
  font-weight: bold;
}
.form-button {
  display: flex;
  float: right;
}
</style>
