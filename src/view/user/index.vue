<template>
  <DivideContainer>
    <template #main>
      <el-container>
        <el-header class="module-header">
          <div class="module-pannel">
            <el-col :span="4">
              <el-row type="flex" justify="center">
                <div class="card-avator">
                  <el-image
                    style="
                      border-radius: 13px;
                      width: 13vh;
                      height: 13vh;
                      margin-top: -10vh;
                      margin-bottom: 0;
                      border: double 10px white;
                      background-color: gray;
                    "
                    :fit="'scale-down'"
                    lazy
                  >
                  </el-image>
                </div>
              </el-row>
              <el-row type="flex" justify="center" style="font-size: 20px">
                {{ userName }}
              </el-row>
            </el-col>
          </div>
        </el-header>
        <el-divider style="margin: 0" />
        <div class="user-main">
          <el-main style="padding: 0; margin: 5px">
            <!--              状态栏+动态页面-->
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
                  <div class="tab-pane-content"></div>
                </el-tab-pane>
              </div>
            </el-tabs>
          </el-main>
        </div>
      </el-container>
    </template>
    <template #right>
      <RightBoard />
    </template>
  </DivideContainer>
</template>

<script lang="ts">
// import { useUserStore } from '/@/store';

export default {
  name: 'userView',
  data() {
    // const userStore = useUserStore();
    return {
      // userName: userStore.username,
      userName: '周奕龙',
    };
  },
};
</script>

<script lang="ts" setup>
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';

import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import BasicInfo from '/@/view/user/basicInfo.vue';
import ChangePwd from '/@/view/user/changePwd.vue';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style scoped>
.module-header {
  background-color: #d1cbd1;
  height: 23vh;
  padding: 0;
}
.module-pannel {
  display: flex;
  background-color: white;
  height: 20vh;
  margin-top: 90px;
  margin-bottom: 0;
}
::v-deep .el-tabs__nav-scroll {
  width: 50% !important;
  margin: 0 auto !important;
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
