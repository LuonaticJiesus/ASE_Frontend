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
                      <el-icon size="large"><Bell /></el-icon>
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
                      <el-icon size="large"><School /></el-icon>
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
                  v-show="userRole >= 0"
                >
                  <el-col>
                    <el-row justify="center">
                      <el-icon size="large"><User /></el-icon>
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
                      <el-icon size="large"><Setting /></el-icon>
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
                  class="subscribe-button"
                  color="#7728F5"
                  :plain="!(userRole >= 0)"
                  @click="userRole >= 0 ? cancelJoinModule() : joinModule()"
                >
                  <div>{{ userRole >= 0 ? '已订阅' : '订阅版块' }}</div>
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
          <router-view
            v-slot="{ Component }"
            :key="$router.currentRoute.value.params['id']"
          >
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </template>
    <template #right> <NoticeBoard /></template>
  </DivideContainer>
</template>

<script>
import {
  Bell,
  ChatLineSquare,
  Edit,
  School,
  Setting,
  User,
} from '@element-plus/icons-vue';
import router from '/@/router/index.js';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { moduleInfo, moduleSubscribe } from '/@/api/module';
import { nextTick, ref } from 'vue';
import { queryRole } from '/@/api/permission.js';
import { ElMessageBox, ElNotification } from 'element-plus';
import 'element-plus/theme-chalk/el-notification.css';
import 'element-plus/theme-chalk/el-message-box.css';
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import NoticeBoard from '/@/components/NoticeBoard.vue';
import { transparentLogo } from '/@/utils/string';

export default {
  name: 'ModuleView',
  components: {
    School,
    Bell,
    Setting,
    User,
    NoticeBoard,
    DivideContainer,
    ChatLineSquare,
    Edit,
  },
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
    const moduleAvatar = ref(transparentLogo);
    const moduleName = ref('Quad-SSSS');
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
  beforeUpdate() {
    this.fetchData();
    this.getUserRole();
    console.log('Now avatar is ' + this.moduleAvatar);
    this.updateActiveStyle();
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
          //useModuleStore().setModuleAvatar(res.avatar);
          this.moduleAvatar = res.avatar;
          //useModuleStore().setModuleName(res.name);
          this.moduleName = res.name;
        })
        .catch((err) => {
          console.log('module.vue fetchData failed: ', err);
        });
    },
    jump: async (url) => {
      // console.log(route);
      // console.log('jump to 111', router.currentRoute.value);
      // eslint-disable-next-line vue/valid-next-tick
      // await nextTick(() => {
      //   router.push({
      //     path: `/module/${router.currentRoute.value.params['id']}/${url}`,
      //   });
      // });
      await router.push({
        path: `/module/${router.currentRoute.value.params['id']}/${url}`,
      });
      await nextTick();
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
      ElMessageBox.confirm('确定取消订阅吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
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
