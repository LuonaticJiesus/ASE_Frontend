<template>
  <DivideContainer>
    <template #main>
      <el-container style="margin: 0">
        <el-header class="module-header">
          <div class="module-pannel">
            <el-col :span="6">
              <el-row type="flex" justify="center">
                <div class="card-avator">
                  <el-image
                    style="
                      border-radius: 13px;
                      width: 20vh;
                      height: 20vh;
                      margin-top: -15vh;
                      margin-bottom: 0;
                      border: double 3px white;
                      background-color: gray;
                    "
                    :src="moduleAvatar"
                    :fit="'scale-down'"
                    lazy
                  >
                  </el-image>
                </div>
              </el-row>
              <el-row type="flex" justify="center">
                {{ moduleName }}
              </el-row>
            </el-col>
            <el-col :span="2">
              <div style="padding-top: 3vh">
                <el-button
                  type="primary"
                  :class="this.activeTab === 1 ? 'active-tab' : 'module-tab'"
                  @click="jump('share')"
                >
                  <el-col>
                    <el-row justify="center">
                      <el-icon size="large"><ChatLineSquare /></el-icon>
                    </el-row>
                    <el-row>
                      <div style="padding-top: 5px">分享</div>
                    </el-row>
                  </el-col>
                </el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div style="padding-top: 3vh">
                <el-button
                  type="primary"
                  :class="this.activeTab === 2 ? 'active-tab' : 'module-tab'"
                  @click="jump('notice')"
                >
                  <el-col>
                    <el-row justify="center">
                      <el-icon size="large"><Edit /></el-icon>
                    </el-row>
                    <el-row>
                      <div style="padding-top: 5px">通知</div>
                    </el-row>
                  </el-col>
                </el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div style="padding-top: 3vh">
                <el-button
                  type="primary"
                  :class="this.activeTab === 3 ? 'active-tab' : 'module-tab'"
                  @click="jump('member')"
                >
                  <el-col>
                    <el-row justify="center">
                      <el-icon size="large"><Edit /></el-icon>
                    </el-row>
                    <el-row>
                      <div style="padding-top: 5px">成员</div>
                    </el-row>
                  </el-col>
                </el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div style="padding-top: 3vh">
                <el-button
                  type="primary"
                  :class="this.activeTab === 4 ? 'active-tab' : 'module-tab'"
                  @click="jump('self')"
                  v-show="userRole > 0"
                >
                  <el-col>
                    <el-row justify="center">
                      <el-icon size="large"><Edit /></el-icon>
                    </el-row>
                    <el-row>
                      <div style="padding-top: 5px">我的</div>
                    </el-row>
                  </el-col>
                </el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div style="padding-top: 3vh">
                <el-button
                  type="primary"
                  :class="this.activeTab === 5 ? 'active-tab' : 'module-tab'"
                  @click="jump('manage')"
                  v-show="userRole > 1"
                >
                  <el-col>
                    <el-row justify="center">
                      <el-icon size="large"><Edit /></el-icon>
                    </el-row>
                    <el-row>
                      <div style="padding-top: 5px">管理</div>
                    </el-row>
                  </el-col>
                </el-button>
              </div>
            </el-col>
            <el-col :offset="1" :span="3">
              <div style="padding-top: 3vh">
                <el-button
                  plain
                  class="subscribe-button"
                  color="#7728F5"
                  :dark="false"
                  @click="userRole >= 0 ? cancelJoinModule() : joinModule()"
                >
                  <div>{{ userRole >= 0 ? '取消订阅' : '订阅版块' }}</div>
                </el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div style="padding-top: 3vh">
                <el-button
                  plain
                  color="#7728F5"
                  :dark="false"
                  class="subscribe-button"
                  @click="createShare()"
                  :disabled="userRole <= 0"
                >
                  <div>创建分享</div>
                </el-button>
              </div>
            </el-col>
          </div>
        </el-header>
        <el-divider style="margin: 0" />
        <el-main style="padding: 0">
          <router-view></router-view>
        </el-main>
      </el-container>
    </template>
    <template #right> <NoticeBoard /></template>
  </DivideContainer>
</template>

<script>
import { ChatLineSquare, Edit } from '@element-plus/icons-vue';
import router from '/@/router/index.js';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { moduleInfo, moduleSubscribe } from '/@/api/module';
import { nextTick, ref } from 'vue';
import { queryRole } from '/@/api/permission.js';
import { ElNotification } from 'element-plus';
import 'element-plus/theme-chalk/el-notification.css';
import { defaultLogo } from '/@/utils/string.ts';
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import NoticeBoard from '/@/components/NoticeBoard.vue';

export default {
  name: 'ModuleView',
  components: { NoticeBoard, DivideContainer, ChatLineSquare, Edit },
  setup() {
    const userRole = ref(0);
    const activeTab = ref(0);
    const tabMap = {
      moduleSharesView: 1,
      moduleNoticesView: 2,
      moduleMembersView: 3,
      moduleSelfView: 4,
      moduleManageView: 5,
    };
    const getUserRole = async () => {
      const block_id = router.currentRoute.value.params['id'];
      if (block_id) {
        let role = await queryRole(block_id);
        if (role) {
          userRole.value = role;
        }
      }
    };
    const updateActiveStyle = () => {
      if (
        router.currentRoute.value.name &&
        router.currentRoute.value.name in tabMap
      ) {
        activeTab.value = tabMap[router.currentRoute.value.name];
        console.log('now active is ' + activeTab.value);
      } else {
        activeTab.value = 0;
      }
    };
    const moduleAvatar = ref(defaultLogo);
    const moduleName = ref('QuadSSSS');
    return {
      moduleName,
      moduleAvatar,
      tableData: [],
      userRole,
      activeTab,
      tabMap,
      getUserRole,
      updateActiveStyle,
    };
  },
  mounted() {
    this.fetchData();
    this.getUserRole();
    this.updateActiveStyle();
    console.log('mounted completed');
  },
  methods: {
    fetchData() {
      console.log('fetchData...', this);
      moduleInfo(
        router.currentRoute.value.params['id'],
        getLocalUserId(),
        getToken(),
      )
        .then((res) => {
          console.log('module.vue fetchData success: ', res);
          this.moduleName = res.name;
          this.moduleAvatar = res.avatar;
        })
        .catch((err) => {
          console.log('module.vue fetchData failed: ', err);
        });
    },
    jump: async (url) => {
      // console.log(route);
      // console.log('jump to 111', router.currentRoute.value);
      // eslint-disable-next-line vue/valid-next-tick
      await nextTick(() => {
        router.push({
          path: `/module/${router.currentRoute.value.params['id']}/${url}`,
        });
      });
      //router.addRoute(router.currentRoute.value.fullPath + '/' + url);
    },
    createShare() {
      console.log(
        'module/module.vue createShare in ',
        router.currentRoute.value.params['id'],
      );
      router.push({
        path: '/editor',
        query: {
          moduleId: router.currentRoute.value.params['id'],
        },
      });
    },
    joinModule() {
      let moduleId = router.currentRoute.value.params['id'];
      let userId = getLocalUserId();
      let token = getToken();
      console.log('module/module.vue joinModule', moduleId);
      moduleSubscribe(moduleId, 1, userId, token)
        .then((res) => {
          console.log('module/module.vue joinModule success ', res);
          location.reload();
          ElNotification({
            title: this.moduleName,
            message: '订阅成功',
          });
        })
        .catch((err) => {
          console.log('module/module.vue joinModule failed ', err);
          ElNotification({
            title: this.moduleName,
            message: '订阅失败',
          });
        });
    },
    cancelJoinModule() {
      let moduleId = router.currentRoute.value.params['id'];
      let userId = getLocalUserId();
      let token = getToken();
      moduleSubscribe(moduleId, 0, userId, token)
        .then((res) => {
          location.reload();
          console.log('module/module.vue cancelJoinModule success ', res);
          ElNotification({
            title: this.moduleName,
            message: '取消订阅成功',
          });
        })
        .catch((err) => {
          console.log('module/module.vue cancelJoinModule failed ', err);
          ElNotification({
            title: this.moduleName,
            message: '取消订阅失败',
          });
        });
    },
  },
};
</script>

<style scoped>
.module-header {
  background-color: silver;
  height: 30vh;
  padding: 0;
}
.module-pannel {
  display: flex;
  background-color: white;
  height: 20vh;
  margin-top: 18vh;
  margin-bottom: 0;
}

.module-tab {
  width: 8vh;
  height: 7vh;
  background-color: rgba(255, 255, 255, 0);
  border: 0;
  color: #838daa;
  font-weight: bold;
}

.module-tab:hover {
  color: #8224e3;
}

.active-tab {
  width: 8vh;
  height: 7vh;
  background-image: linear-gradient(
    135deg,
    rgb(195, 149, 241) 0%,
    rgb(130, 36, 227) 75%
  );
  border: 0;
  color: white;
  box-shadow: rgba(58, 46, 68, 0.7) 0 10px 20px -8px;
  font-weight: bold;
}

.subscribe-button {
  width: 7vw;
  height: 5vh;
  border-radius: 20px;
  margin-left: 12px;
  font-weight: bold;
}
</style>
