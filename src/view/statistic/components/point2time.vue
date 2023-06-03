<template>
  <div>
    <div id="myChart1" style="width: 65vw; height: 70vh"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, PropType } from 'vue';
import { pointTimeType } from '/@/utils/type';

const props = defineProps({
  list: {
    type: Array as PropType<pointTimeType[]>,
    default: Array,
  },
});

const option = {
  title: {
    text: '积分变化-时间',
  },
  xAxis: {
    data: props.list.map((item) => new Date(item.time).toLocaleDateString()),
  },
  yAxis: {},
  series: [
    {
      data: props.list.map((item) => item.point),
      type: 'line',
    },
  ],
};

onMounted(() => {
  let myChart = echarts.init(document.getElementById('myChart1'));
  myChart.setOption(option);
  window.onresize = function () {
    //自适应大小
    myChart.resize();
  };
});
</script>

<script lang="ts">
export default {
  name: 'point-time',
};
</script>

<style scoped></style>
