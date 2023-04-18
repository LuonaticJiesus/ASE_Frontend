<template>
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
                :src="moduleAvator"
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
              color="#626aef"
              style="height: 7vh; width: 7vh"
              @click="jump('/module/share')"
            >
              <el-col>
                <el-row>
                  <el-icon class="el-icon--right"><Edit /></el-icon>
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
              color="#626aef"
              style="height: 7vh; width: 7vh"
              @click="jump('/module/member')"
            >
              <el-col>
                <el-row>
                  <el-icon class="el-icon--right"><Edit /></el-icon>
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
              color="#626aef"
              style="height: 7vh; width: 7vh"
              @click="jump('/module/notice')"
            >
              <el-col>
                <el-row>
                  <el-icon class="el-icon--right"><Edit /></el-icon>
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
              color="#626aef"
              style="height: 7vh; width: 7vh"
              @click="jump('/module/self')"
            >
              <el-col>
                <el-row>
                  <el-icon class="el-icon--right"><Edit /></el-icon>
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
              color="#626aef"
              style="height: 7vh; width: 7vh"
              @click="jump('/module/manage')"
            >
              <el-col>
                <el-row>
                  <el-icon class="el-icon--right"><Edit /></el-icon>
                </el-row>
                <el-row>
                  <div style="padding-top: 5px">管理</div>
                </el-row>
              </el-col>
            </el-button>
          </div>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="3">
          <div style="padding-top: 3vh">
            <el-button
              type="primary"
              style="width: 15vh; height: 7vh; border-radius: 4vh"
            >
              <div>订阅分享</div>
            </el-button>
          </div>
        </el-col>
        <el-col :span="3">
          <div style="padding-top: 3vh">
            <el-button
              type="primary"
              style="width: 15vh; height: 7vh; border-radius: 4vh"
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

<script>
import { Edit } from '@element-plus/icons-vue';
import router from '/@/router/index.js';
import { moduleInfo } from '/@/api/module';

export default {
  name: 'ModuleView',
  components: { Edit },
  data: () => {
    return {
      moduleName: 'QuadSSSS',
      moduleAvator: '/src/assets/logo.png',
      tableData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('fetchData...', this);
      moduleInfo(0, 0, '')
        .then((res) => {
          console.log('module.vue fetchData success: ', res);
          this.moduleName = res.block_name;
          this.moduleAvator = res.block_logo;
        })
        .catch((err) => {
          console.log('module.vue fetchData failed: ', err);
        });
    },
    jump: (url) => {
      console.log(route);
      console.log('jump to ', '/module/' + url);
      router.push(url);
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
  margin-top: 130px;
  margin-bottom: 0;
}
</style>
