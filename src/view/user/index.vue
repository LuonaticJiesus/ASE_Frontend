<template>
  <DivideContainer>
    <template #main>
      <el-container>
        <el-header class="module-header">
          <div class="module-pannel">
            <el-col :span="4">
              <el-row type="flex" justify="center">
                <el-upload
                  :show-file-list="false"
                  :limit="1"
                  action="dev-api/four_s/file/upload/"
                  :headers="headers"
                  :before-upload="beforeAvatarUpload"
                  :on-success="updateAvtar"
                  :on-exceed="handleExceed"
                >
                  <div class="card-avator">
                    <el-image
                      style="
                        border-radius: 13px;
                        width: 13vh;
                        height: 13vh;
                        margin-top: -10vh;
                        margin-bottom: 0;
                        border: solid 5px white;
                      "
                      :fit="'scale-down'"
                      lazy
                      :src="userAvatar"
                    >
                    </el-image>
                  </div>
                </el-upload>
              </el-row>
              <el-row
                type="flex"
                justify="center"
                style="font-size: 17px; margin-top: -6px"
              >
                {{ this.userName }}
              </el-row>
            </el-col>
          </div>
        </el-header>
        <el-divider style="margin: 0" />
        <el-main class="user-main">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
            stretch
          >
            <div class="tab-pane-wrapper">
              <el-tab-pane label="基本信息" name="first">
                <div class="tab-pane-content">
                  <basic-info />
                </div>
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="second">
                <div class="tab-pane-content">
                  <change-pwd />
                </div>
              </el-tab-pane>
              <el-tab-pane label="统计" name="third">
                <div class="tab-pane-content">
                  <user-statistic />
                </div>
              </el-tab-pane>
            </div>
          </el-tabs>
        </el-main>
      </el-container>
    </template>
    <template #right>
      <RightBoard />
    </template>
  </DivideContainer>
</template>

<script lang="ts">
import { changeBasicInfo, getUserProfile } from '/@/api/user';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { ref } from 'vue';
import { useUserStore } from '/@/store';
import { ElMessage, TabsPaneContext } from 'element-plus';
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
import BasicInfo from '/@/view/user/basicInfo.vue';
import ChangePwd from '/@/view/user/changePwd.vue';
import UserStatistic from '/@/view/user/userStatistic.vue';

export default {
  name: 'userView',
  components: {
    BasicInfo,
    ChangePwd,
    UserStatistic,
    RightBoard,
    DivideContainer,
  },
  data() {
    return {
      userName: '',
    };
  },
  setup() {
    const activeName = ref('first');

    const headers = {
      userid: getLocalUserId(),
      token: getToken(),
    };

    const userAvatar = ref(useUserStore().avatar);

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event);
    };

    const beforeAvatarUpload = (rawFile) => {
      if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('头像必须是.jpg格式!');
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像不能大于2MB!');
        return false;
      }
      return true;
    };

    const handleExceed = () => {
      ElMessage.error('不能上传多张图片!');
    };

    const updateAvtar = async (res) => {
      console.log('avatar is ' + res.data.url);
      await changeBasicInfo({ avatar: res.data.url }, headers);
      await useUserStore().getInfo();
      userAvatar.value = useUserStore().avatar;
    };
    return {
      activeName,
      headers,
      userAvatar,
      handleClick,
      beforeAvatarUpload,
      handleExceed,
      updateAvtar,
    };
  },
  methods: {
    async fetchData() {
      try {
        const userProfile = await getUserProfile({
          userid: getLocalUserId(),
          token: getToken(),
        });
        // console.log('user index test profile:');
        this.userName = userProfile.name;
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
.module-header {
  background-color: #d1cbd1;
  height: 20vh;
  padding: 0;
}

.module-pannel {
  display: flex;
  background-color: white;
  height: 20vh;
  margin-top: 11vh;
  margin-bottom: 0;
}

.user-main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 5px;
}

.user-main:deep(.el-tabs__nav-wrap::after) {
  position: static !important;
}

.el-tabs:deep(.el-tabs__item.is-active) {
  color: #b33dd1;
}

.el-tabs:deep(.el-tabs__item:hover) {
  color: #b33dd1;
}

.el-tabs:deep(.el-tabs__active-bar) {
  background-color: #b33dd1;
}

.user-main:deep(.el-tabs__item) {
  font-size: 13px !important;
  color: gray;
}

::v-deep .el-tabs__nav-scroll {
  width: 60% !important;
}

.el-tabs__content > .el-tab-pane::before {
  content: '';
  display: block;
  margin-top: -2px;
}

.tab-pane-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.el-tab-pane {
  width: 100%;
  height: 100%;
}

.tab-pane-content {
  height: 100%;
  width: 100%;
}
</style>
