<template>
  <DivideContainer>
    <template #main>
      <div class="statistic-center">
        <h2 style="margin: 0; text-align: start">统计中心</h2>
        <el-divider style="margin-top: 5px; margin-bottom: 10px"></el-divider>
        <el-tabs>
          <el-tab-pane label="积分-时间表">
            <point-time :list="pointTimeData" v-if="isReady"> </point-time>
          </el-tab-pane>
          <el-tab-pane label="积分来源-模块表">
            <point-source-module
              :list="pointSourceModuleData"
              v-if="isReady"
            ></point-source-module>
          </el-tab-pane>
          <el-tab-pane label="发帖-模块表">
            <post-module :list="postModuleData" v-if="isReady"></post-module>
          </el-tab-pane>
          <el-tab-pane label="发帖-时间表">
            <post-time :list="postTimeData" v-if="isReady"></post-time>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <template #right> <RightBoard /> </template>
  </DivideContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { getLocalUserId, getToken } from '/@/utils/auth';

const isReady = ref(false);
const pointTimeData = ref([]);
const pointSourceModuleData = ref([]);
const postModuleData = ref([]);
const postTimeData = ref([]);
// const headers = {
//   userid: getLocalUserId(),
//   token: getToken(),
// };
onMounted(async () => {
  // pointTimeData.value = await getPointTime();
  // pointSourceModuleData.value = await getPointSourceModule();
  // postModuleData.value = await getPostModule();
  // postTimeData.value = await getPostTime();
  pointTimeData.value = [
    { point: 2, time: '2003-06-17 05:34:11' },
    { point: 3, time: '2003-06-18 05:34:11' },
  ];
  postTimeData.value = [
    { post_num: 15, time: '2003-06-17 05:34:11' },
    { post_num: 8, time: '2003-06-18 05:34:11' },
  ];
  postModuleData.value = [
    { value: 15, name: '软件工程' },
    { value: 2, name: 'test' },
  ];
  pointSourceModuleData.value = [
    { value: 5, name: '软件工程' },
    { value: 30, name: 'test' },
  ];
  isReady.value = true;
});
</script>

<script lang="ts">
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
import PointTime from '/@/view/statistic/components/point2time.vue';
import PointSourceModule from '/@/view/statistic/components/pointSource2module.vue';
import PostModule from '/@/view/statistic/components/post2module.vue';
import PostTime from '/@/view/statistic/components/post2time.vue';

export default {
  name: 'chartView',
  components: {
    PostTime,
    PostModule,
    PointSourceModule,
    PointTime,
    RightBoard,
    DivideContainer,
  },
};
</script>

<style scoped></style>
