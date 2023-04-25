<template>
  <div style="margin: 3vh">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="所有版块" name="first">
        <el-container>
          <el-header>这里有个搜索栏和筛选选项</el-header>
          <el-main class="card-wrap">
            <CardModule
              v-for="item in moduleList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize,
              )"
              :key="item.modduleId"
              :modduleId="item.block_id"
              :moduleName="item.name"
              :moduleAvator="item.avator"
              :memberNumber="item.time"
            ></CardModule>
          </el-main>
        </el-container>
        <div style="height: 50px; width: 100px; margin: 50px auto auto">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="moduleList.length"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的版块" name="second">我的版块</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { moduleAll } from '/@/api/module';
import CardModule from './components/CardModule.vue';
import { getToken } from '/@/utils/auth';

export default {
  name: 'ModuleListView',
  components: { CardModule },
  data: () => {
    return {
      activeName: 'first',
      moduleList: [],
      currentPage: 1,
      pageSize: 6,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('fetchData...', this);
      moduleAll(0, getToken())
        .then((res) => {
          console.log('module/list.vue fetchData success: ', res);
          this.moduleList = res;
        })
        .catch((err) => {
          console.log('module/list.vue fetchData failed: ', err);
        });
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>

<style scoped>
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
  margin: 0px;
}
</style>
