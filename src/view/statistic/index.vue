<template>
  <DivideContainer>
    <template #main>
      <div class="statistic-center">
        <h2 style="margin: 0; text-align: start">统计中心</h2>
        <el-divider style="margin-top: 5px; margin-bottom: 10px"></el-divider>
        <el-tabs v-model="activeName">
          <el-tab-pane label="积分-时间表" name="tab1">
            <point-time
              :list="pointTimeData"
              v-if="activeName === 'tab1' && isReady"
              @refresh="changePointData()"
            >
            </point-time>
          </el-tab-pane>
          <el-tab-pane label="积分来源-模块表" name="tab2">
            <point-module
              :list="pointModuleData"
              v-if="activeName === 'tab2' && isReady"
            ></point-module>
          </el-tab-pane>
          <el-tab-pane label="发帖-模块表" name="tab3">
            <post-module
              :list="postModuleData"
              v-if="activeName === 'tab3' && isReady"
            ></post-module>
          </el-tab-pane>
          <el-tab-pane label="发帖-时间表" name="tab4">
            <post-time
              :list="postTimeData"
              v-if="activeName === 'tab4' && isReady"
              @refresh="changePostData()"
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

const isPointTime = ref(false);
const pointTimeData_d = ref([]); //积分-时间，7天数据
const pointTimeData_m = ref([]); //积分-时间，12月数据

const isPostTime = ref(false);
const postTimeData_d = ref([]); //帖子-时间，7天数据
const postTimeData_m = ref([]); //帖子-时间，12天数据

const isReady = ref(false); //控制等待数据传值完毕再加载子组件
const pointTimeData = ref([]);
const pointModuleData = ref([]);
const postModuleData = ref([]);
const postTimeData = ref([]);
// const headers = {
//   userid: getLocalUserId(),
//   token: getToken(),
// };
onMounted(async () => {
  // pointTimeData_d.value = await getPostTime(headers, params: {state: 2});
  // pointTimeData_m.value = await getPostTime(headers, params: {state: 1});
  // pointModuleData.value = await getPointSource(headers);
  // postModuleData.value = await getPostModule(headers);
  // postTimeData_d.value = await getPointTime(headers, params: {state: 2});
  // postTimeData_m.value = await getPointTime(headers, params: {state: 1});
  // pointTimeData.value = pointTimeData_d.value;
  // postTimeData.value = postTimeData_d.value;
  pointTimeData_d.value = [
    { point: 2, time: '2003-06-17' },
    { point: 3, time: '2003-06-18' },
    { point: 1, time: '2003-06-19' },
    { point: 6, time: '2003-06-20' },
    { point: 3, time: '2003-06-21' },
    { point: 4, time: '2003-06-22' },
    { point: 7, time: '2003-06-23' },
  ];
  pointTimeData_m.value = [
    { point: 2, time: '2003-01' },
    { point: 3, time: '2003-02' },
    { point: 1, time: '2003-03' },
    { point: 6, time: '2003-04' },
    { point: 3, time: '2003-05' },
    { point: 4, time: '2003-06' },
    { point: 7, time: '2003-07' },
    { point: 10, time: '2003-08' },
    { point: 13, time: '2003-09' },
    { point: 7, time: '2003-10' },
    { point: 3, time: '2003-11' },
    { point: 1, time: '2003-12' },
  ];
  postTimeData_d.value = [
    { post_num: 15, time: '2003-06-17' },
    { post_num: 8, time: '2003-06-18' },
    { post_num: 2, time: '2003-06-19' },
    { post_num: 1, time: '2003-06-20' },
    { post_num: 0, time: '2003-06-21' },
    { post_num: 0, time: '2003-06-22' },
    { post_num: 10, time: '2003-06-23' },
  ];
  postTimeData_m.value = [
    { post_num: 1, time: '2003-01' },
    { post_num: 7, time: '2003-02' },
    { post_num: 0, time: '2003-03' },
    { post_num: 0, time: '2003-04' },
    { post_num: 0, time: '2003-05' },
    { post_num: 0, time: '2003-06' },
    { post_num: 10, time: '2003-07' },
    { post_num: 13, time: '2003-08' },
    { post_num: 8, time: '2003-09' },
    { post_num: 2, time: '2003-10' },
    { post_num: 3, time: '2003-11' },
    { post_num: 0, time: '2003-12' },
  ];
  pointTimeData.value = pointTimeData_d.value;
  postTimeData.value = postTimeData_d.value;
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

const changePointData = () => {
  isReady.value = false;
  console.log('stat index.vue change pointTime data');
  if (isPointTime.value) {
    pointTimeData.value = pointTimeData_d.value;
    isPointTime.value = false;
  } else {
    pointTimeData.value = pointTimeData_m.value;
    isPointTime.value = true;
  }
  isReady.value = true;
};

const changePostData = () => {
  isReady.value = false;
  console.log('stat index.vue change postTime data');
  if (isPostTime.value) {
    postTimeData.value = postTimeData_d.value;
    isPostTime.value = false;
  } else {
    postTimeData.value = postTimeData_m.value;
    isPostTime.value = true;
  }
  isReady.value = true;
};
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
