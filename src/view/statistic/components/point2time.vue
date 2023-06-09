<template>
  <!--  <el-select-v2-->
  <!--    v-model="selected"-->
  <!--    :options="options"-->
  <!--    @change="handleSelect()"-->
  <!--  />-->
  <div id="myChart1" style="width: 65vw; height: 70vh"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, PropType, ref } from 'vue';
import { pointTimeType } from '/@/utils/type';

const props = defineProps({
  list: {
    type: Array as PropType<pointTimeType[]>,
    default: Array,
  },
});

// const selected = ref('最近七天');
// const options = [
//   { label: '最近七天', value: 'option1' },
//   { label: '最近一年', value: 'option2' },
// ];

let chart;
const option = {
  title: {
    text: '积分变化-时间',
    left: 'center',
    top: 'bottom',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}积分数: {c}',
  },
  xAxis: {
    data: props.list.map((item) => item.time),
  },
  yAxis: {},
  series: [
    {
      data: props.list.map((item) => item.point),
      type: 'line',
    },
  ],
};

const drawChart = () => {
  chart.setOption(option, true);
  window.onresize = function () {
    //自适应大小，模板给的
    chart.resize();
  };
};

// const refreshData = () => {
//   option.xAxis.data = props.list.map((item) => item.time);
//   option.series.at(0).data = props.list.map((item) => item.point);
// };

onMounted(() => {
  chart = echarts.init(document.getElementById('myChart1'));
  drawChart();
});

// const emit = defineEmits(['refresh']);
// const handleSelect = () => {
//   emit('refresh');
// };
//
// watch(
//   () => props.list,
//   (count, prevCount) => {
//     chart.clear();
//     refreshData();
//     drawChart();
//     console.log(count, prevCount);
//   },
//   {
//     deep: true,
//   },
// );
</script>

<script lang="ts">
export default {
  name: 'point-time',
  methods: {},
};
</script>

<style scoped></style>
