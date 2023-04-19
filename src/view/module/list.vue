<template>
  <div style="margin: 3vh">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="所有版块" name="first">
        <div>这里有个搜索栏和筛选选项</div>
        <ul
          :v-infinite-scroll="this.load"
          class="infinite-list"
          style="overflow: auto"
        >
          <li v-for="i in this.moduleList" :key="i" class="infinite-list-item">
            <el-col
              span="4"
              v-for="item of this.moduleList[i]"
              :key="item.moduelId"
            >
              <CardModule
                :moduelId="item.moduleId"
                :moduleAvator="item.moduleAvator"
                :moduleName="item.moduleName"
              />
            </el-col>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="我的版块" name="second">我的版块</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { moduleRandom } from '/@/api/module';
import CardModule from './components/CardModule.vue';

export default {
  name: 'ModuleListView',
  components: { CardModule },
  data: () => {
    return {
      activeName: 'first',
      moduleList: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('fetchData...', this);
      this.load();
    },
    load() {
      for (var i = 0; i < 5; i++) {
        moduleRandom(3, 0, '')
          .then((res) => {
            console.log('list.vue load success: ', res);
            this.moduleList.push(res.modules);
            console.log(this.moduleList);
          })
          .catch((err) => {
            console.log('list.vue load failed: ', err);
          });
      }
    },
  },
};
</script>

<style scoped>
.infinite-list {
  height: 70vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45vh;
  background: white;
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
