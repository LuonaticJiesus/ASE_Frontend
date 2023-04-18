<template>
  <div style="margin: 3vh">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="所有版块" name="first">
        <div>这里有个搜索栏和筛选选项</div>
        <ul
          v-infinite-scroll="load"
          class="infinite-list"
          style="overflow: auto"
        >
          <li v-for="i in count" :key="i" class="infinite-list-item">
            <el-col span="4">
              <CardModule />
            </el-col>
            <el-col span="4">
              <CardModule />
            </el-col>
            <el-col span="4">
              <CardModule />
            </el-col>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="我的版块" name="second">我的版块</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { moduleInfo } from '/@/api/module';
import CardModule from './components/CardModule.vue';

export default {
  name: 'ModuleListView',
  components: { CardModule },
  data: () => {
    return {
      activeName: 'first',
      moduleName: 'QuadSSSS',
      moduleAvator: '/src/assets/logo.png',
      tableData: [],
      count: 99,
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
    load() {
      count.value += 2;
    },
  },
};
</script>

<style scoped>
.infinite-list {
  height: 80vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
  background: white;
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
