<template>
  <DivideContainer>
    <template #main>
      <div class="statistic-center">
        <h2 style="margin: 0; text-align: start">统计中心</h2>
        <el-divider style="margin-top: 5px; margin-bottom: 10px"></el-divider>
        <point-time :list="pointTimeData" v-if="isReady"> </point-time>
        <!--        <el-tabs v-model="activeName">-->
        <!--          <el-tab-pane label="积分-时间表" name="tab1">-->
        <!--            <point-time-->
        <!--              :list="pointTimeData"-->
        <!--              v-if="activeName === 'tab1' && isReady"-->
        <!--            >-->
        <!--            </point-time>-->
        <!--          </el-tab-pane>-->
        <!--          <el-tab-pane label="积分来源-模块表" name="tab2">-->
        <!--            <point-module-->
        <!--              :list="pointModuleData"-->
        <!--              v-if="activeName === 'tab2' && isReady"-->
        <!--            ></point-module>-->
        <!--          </el-tab-pane>-->
        <!--          <el-tab-pane label="发帖-模块表" name="tab3">-->
        <!--            <post-module-->
        <!--              :list="postModuleData"-->
        <!--              v-if="activeName === 'tab3' && isReady"-->
        <!--            ></post-module>-->
        <!--          </el-tab-pane>-->
        <!--          <el-tab-pane label="发帖-时间表" name="tab4">-->
        <!--            <post-time-->
        <!--              :list="postTimeData"-->
        <!--              v-if="activeName === 'tab4' && isReady"-->
        <!--              @refresh="changePostData()"-->
        <!--            ></post-time>-->
        <!--          </el-tab-pane>-->
        <!--        </el-tabs>-->
      </div>
    </template>
    <template #right> <RightBoard /> </template>
  </DivideContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { pointType } from '/@/utils/type';
import { getDaysBetween } from '/@/utils/string';
import { getMessageList } from '/@/api/message';
import { getUserProfile } from '/@/api/user';

// import {
//   getPointSource,
//   getPointTime,
//   getPostModule,
//   getPostTime,
// } from '/@/api/statistic';
// import { getLocalUserId, getToken } from '/@/utils/auth';

// const isPointTime = ref(false);
// const pointTimeData_d = ref([]); //积分-时间，7天数据
// const pointTimeData_m = ref([]); //积分-时间，12月数据
//
// const isPostTime = ref(false);
// const postTimeData_d = ref([]); //帖子-时间，7天数据
// const postTimeData_m = ref([]); //帖子-时间，12天数据

const isReady = ref(false); //控制等待数据传值完毕再加载子组件
const pointTimeChange = ref([]); //变化量，用变化量反推
const pointTimeData = ref([]);
// const pointModuleData = ref([]);
// const postModuleData = ref([]);
// const postTimeData = ref([]);

const pointMessages = ref([]);
const allMessages = ref([]);

const filterMessages = () => {
  for (let item of allMessages.value) {
    if (pointType.find((i) => i === item.message_type) >= 0) {
      pointMessages.value.push(item);
    }
  }
};

const getDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + '-' + month + '-' + day;
};

const genPointTimeChange = () => {
  let today = new Date();
  for (let i = 0; i < 7; i++) {
    const element = {
      point: 0,
      time: getDate(today),
    };
    pointTimeChange.value.push(element);
    today.setDate(today.getDate() - 1);
  }
};

let userProfile;
let maxDays;

const fillChange = () => {
  for (const item of pointMessages.value) {
    pointTimeChange.value.forEach(function (element) {
      if (element.time === getDate(new Date(item.time))) {
        element.point += item.point;
      }
    });
    const dateDiff = getDaysBetween(new Date(item.time), new Date()) + 1;
    if (dateDiff <= 7) maxDays = Math.min(7, dateDiff);
  }
};

const reverseData = () => {
  console.log(pointTimeChange.value);
  let today = new Date();
  let tmpPoint = userProfile.point;
  for (let i = 0; i < maxDays; i++) {
    const element = {
      point: tmpPoint,
      time: getDate(today),
    };
    pointTimeData.value.push(element);
    tmpPoint -= pointTimeChange.value.at(i).point;
    today.setDate(today.getDate() - 1);
  }
  pointTimeData.value.reverse();
  console.log(pointTimeData.value);
};

const headers = {
  userid: getLocalUserId(),
  token: getToken(),
};

const genPointTimeData = () => {
  genPointTimeChange();
  fillChange();
  reverseData();
};

onMounted(async () => {
  // pointTimeData_d.value = await getPostTime(headers, params: {state: 2});
  // pointTimeData_m.value = await getPostTime(headers, params: {state: 1});
  // pointModuleData.value = await getPointSource(headers);
  // postModuleData.value = await getPostModule(headers);
  // postTimeData_d.value = await getPointTime(headers, params: {state: 2});
  // postTimeData_m.value = await getPointTime(headers, params: {state: 1});
  // pointTimeData.value = pointTimeData_d.value;
  // postTimeData.value = postTimeData_d.value;
  const result = await getMessageList(headers);
  if (result && result.length > 0) {
    allMessages.value = result;
    filterMessages();
  }
  userProfile = await getUserProfile(headers);
  genPointTimeData();
  isReady.value = true;
});

// const changePointData = () => {
//   isReady.value = false;
//   console.log('stat index.vue change pointTime data');
//   if (isPointTime.value) {
//     pointTimeData.value = pointTimeData_d.value;
//     isPointTime.value = false;
//   } else {
//     pointTimeData.value = pointTimeData_m.value;
//     isPointTime.value = true;
//   }
//   isReady.value = true;
// };
//
// const changePostData = () => {
//   isReady.value = false;
//   console.log('stat index.vue change postTime data');
//   if (isPostTime.value) {
//     postTimeData.value = postTimeData_d.value;
//     isPostTime.value = false;
//   } else {
//     postTimeData.value = postTimeData_m.value;
//     isPostTime.value = true;
//   }
//   isReady.value = true;
// };
</script>

<script lang="ts">
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
import PointTime from '/@/view/statistic/components/point2time.vue';
// import PostModule from '/@/view/statistic/components/post2module.vue';
// import PointModule from '/@/view/statistic/components/point2module.vue';
// import PostTime from '/@/view/statistic/components/post2time.vue';

export default {
  name: 'chartView',
  components: {
    RightBoard,
    DivideContainer,
    PointTime,
    // PostModule,
    // PointModule,
    // PostTime,
  },
  data() {
    return {
      activeName: 'tab1',
    };
  },
};
</script>

<style scoped></style>
