<template>
  <DivideContainer>
    <template #main>
      <div class="statistic-center">
        <h2 style="margin: 0; text-align: start">统计中心</h2>
        <el-divider style="margin-top: 5px; margin-bottom: 10px"></el-divider>
        <el-tabs v-model="activeName">
          <el-tab-pane label="积分-时间表" :lazy="true" name="tab1">
            <point-time
              :list="pointTimeData"
              v-if="activeName === 'tab1' && isReady"
            >
            </point-time>
          </el-tab-pane>
          <el-tab-pane label="积分来源-模块表" :lazy="true" name="tab2">
            <point-module
              :list="pointModuleData"
              v-if="activeName === 'tab2' && isReady"
            ></point-module>
          </el-tab-pane>
          <el-tab-pane label="发帖-模块表" :lazy="true" name="tab3">
            <post-module
              :list="postModuleData"
              v-if="activeName === 'tab3' && isReady"
            ></post-module>
          </el-tab-pane>
          <el-tab-pane label="发帖-时间表" :lazy="true" name="tab4">
            <post-time
              :list="postTimeData"
              v-if="activeName === 'tab4' && isReady"
            ></post-time>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <template #right> <RightBoard /> </template>
  </DivideContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import {
//   getPointSource,
//   getPointTime,
//   getPostModule,
//   getPostTime,
// } from '/@/api/statistic';
// import { getLocalUserId, getToken } from '/@/utils/auth';

const isReady = ref(false);
const pointTimeData = ref([]);
const pointModuleData = ref([]);
const postModuleData = ref([]);
const postTimeData = ref([]);
// const headers = {
//   userid: getLocalUserId(),
//   token: getToken(),
// };
onMounted(async () => {
  // pointTimeData.value = await getPostTime(headers, params: {state: 2});
  // pointModuleData.value = await getPointSource(headers);
  // postModuleData.value = await getPostModule(headers);
  // postTimeData.value = await getPointTime(headers, params: {state: 2});
  pointTimeData.value = [
    { point: 2, time: '2003-06-17 05:34:11' },
    { point: 3, time: '2003-06-18 05:34:11' },
    { point: 1, time: '2003-06-19 05:34:11' },
    { point: 6, time: '2003-06-20 05:34:11' },
    { point: 3, time: '2003-06-21 05:34:11' },
    { point: 4, time: '2003-06-22 05:34:11' },
    { point: 7, time: '2003-06-23 05:34:11' },
  ];
  postTimeData.value = [
    { post_num: 15, time: '2003-06-17 05:34:11' },
    { post_num: 8, time: '2003-06-18 05:34:11' },
  ];
  postModuleData.value = [
    { value: 15, name: '软件工程' },
    { value: 2, name: 'test' },
  ];
  pointModuleData.value = [
    { value_plus: 5, value_minus: 10, name: '软件工程' },
    { value_plus: 30, value_minus: 2, name: 'test' },
  ];
  isReady.value = true;
});
</script>

<script lang="ts">
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
import PointTime from '/@/view/statistic/components/point2time.vue';
import PostModule from '/@/view/statistic/components/post2module.vue';
import PointModule from '/@/view/statistic/components/point2module.vue';
import PostTime from '/@/view/statistic/components/post2time.vue';

export default {
  name: 'chartView',
  components: {
    RightBoard,
    DivideContainer,
    PointTime,
    PostModule,
    PointModule,
    PostTime,
  },
  data() {
    return {
      activeName: 'tab1',
    };
  },
};
</script>

<style scoped></style>
