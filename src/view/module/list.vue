<template>
  <div style="margin: 2vh">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="所有版块" name="first" class="list-tab">
        <el-container style="margin: 0; padding: 0">
          <el-header class="header">
            <el-input
              v-model="searchContent"
              placeholder="在所有模块中搜索"
              :prefix-icon="Search"
              class="custom-input"
              @change="handleSearch"
            ></el-input>
          </el-header>
          <el-divider style="margin: 0" />
          <el-main style="margin: 0; padding: 0">
            <el-scrollbar height="63vh" style="padding: 0">
              <div class="card-wrap">
                <CardModule
                  v-for="item in moduleList.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize,
                  )"
                  :key="item.block_id"
                  :moduleId="item.block_id"
                  :moduleName="item.name"
                  :moduleAvator="item.avatar"
                  :memberNumber="item.population"
                ></CardModule>
              </div>
            </el-scrollbar>
          </el-main>
          <div style="height: 4.5vh; width: 30vw; margin: 1.5vh auto auto">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="moduleList.length"
            >
            </el-pagination>
          </div>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="我的版块" name="second" class="list-tab">
        <el-container style="margin: 0; padding: 0">
          <el-header class="header">
            <el-input
              v-model="searchContent"
              placeholder="在所有模块中搜索"
              :prefix-icon="Search"
              class="custom-input"
              @change="handleSearch"
            ></el-input>
          </el-header>
          <el-divider style="margin: 0" />
          <el-main style="margin: 0; padding: 0">
            <el-scrollbar height="63vh" style="padding: 0">
              <div class="card-wrap">
                <CardModule
                  v-for="item in myModuleList.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize,
                  )"
                  :key="item.block_id"
                  :moduleId="item.block_id"
                  :moduleName="item.name"
                  :moduleAvator="item.avatar"
                  :memberNumber="item.population"
                ></CardModule>
              </div>
            </el-scrollbar>
          </el-main>
          <div style="height: 4.5vh; width: 30vw; margin: 1.5vh auto auto">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="moduleList.length"
              class="pager-bg"
            >
            </el-pagination>
          </div>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { moduleAll, modulePermission, moduleSearch } from '/@/api/module';
import CardModule from './components/CardModule.vue';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { Search } from '@element-plus/icons-vue';

export default {
  name: 'ModuleListView',
  components: { CardModule },
  computed: {
    Search() {
      return Search;
    },
  },
  data: () => {
    return {
      searchContent: '',
      activeName: 'first',
      allModules: [],
      moduleList: [],
      myModuleList: [],
      currentPage: 1,
      pageSize: 12,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('fetchData...', this);
      moduleAll(getLocalUserId(), getToken())
        .then((res) => {
          console.log('module/list.vue fetchData success 2: ', res);
          this.moduleList = res;
        })
        .catch((err) => {
          console.log('module/list.vue fetchData failed: ', err);
        });
      for (let p = 0; p <= 3; p++) {
        modulePermission(p, getLocalUserId(), getToken())
          .then((res) => {
            console.log('module/list.vue fetchData success 1: ', res);
            this.myModuleList.push(...res);
          })
          .catch((err) => {
            console.log('module/list.vue fetchData failed: ', err);
          });
      }
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    handleSearch() {
      console.log('module/list.vue search');
      moduleSearch(this.searchContent, getLocalUserId(), getToken())
        .then((res) => {
          console.log('module/list.vue search success: ', res);
          this.moduleList = res;
        })
        .catch((err) => {
          console.log('module/list.vue search failed: ', err);
        });
      moduleSearch(this.searchContent, getLocalUserId(), getToken())
        .then((res) => {
          console.log('module/list.vue search success: ', res);
          this.myModuleList = res;
        })
        .catch((err) => {
          console.log('module/list.vue search failed: ', err);
        });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-top: 0;
}
.card-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.CardModule {
  flex: 1;
  width: 300px;
  min-width: 300px;
  margin: 0;
  padding: 0;
}
.custom-input {
  font-size: 70%;
  height: 50%;
  width: 40vh;
  margin-left: 0;
  left: 0;
  box-shadow: 0px 2px 0px 0px #e5e5e5;
}
.custom-input :deep(.el-input__wrapper) {
  background-color: #f9f3f9;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-card:deep(.el-card__body) {
  padding: 10px 0 10px;
}

.el-tabs:deep(.el-tabs__item) {
  font-weight: bold;
  font-size: medium;
}

.el-tabs:deep(.el-tabs__item.is-active) {
  color: blueviolet;
}

.el-tabs:deep(.el-tabs__item:hover) {
  color: blueviolet;
}

.el-tabs:deep(.el-tabs__active-bar) {
  background-color: blueviolet;
}

.el-pager li.is-active {
  color: blueviolet;
}

.pager-bg:deep(.el-pager li:deep(.is-active)) {
  color: red;
}
</style>
