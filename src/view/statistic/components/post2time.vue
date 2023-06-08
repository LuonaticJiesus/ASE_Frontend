<template>
  <div id="myChart4" style="width: 65vw; height: 70vh"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, PropType } from 'vue';
import { postTimeType } from '/@/utils/type';

const props = defineProps({
  list: {
    type: Array as PropType<postTimeType[]>,
    default: Array,
  },
});

const option = {
  title: {
    text: '发帖-时间',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}',
  },
  xAxis: {
    data: props.list.map((item) => new Date(item.time).toLocaleDateString()),
  },
  yAxis: {},
  series: [
    {
      data: props.list.map((item) => item.post_num),
      type: 'line',
    },
  ],
};

onMounted(() => {
  let myChart = echarts.init(document.getElementById('myChart4'));
  myChart.setOption(option);
  window.onresize = function () {
    //自适应大小
    myChart.resize();
  };
});
</script>

<script lang="ts">
export default {
  name: 'post-time',
};
</script>

<style scoped></style>
