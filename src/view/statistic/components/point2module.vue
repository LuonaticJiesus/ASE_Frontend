<template>
  <div class="pie-chart-wrapper">
    <div id="myChart2" style="width: 60vw; height: 70vh"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, PropType } from 'vue';
import { pointSourceModuleType } from '/@/utils/type';

const props = defineProps({
  list: {
    type: Array as PropType<pointSourceModuleType[]>,
    default: Array,
  },
});

let plus_pie = props.list.map((item) => {
  return {
    name: item.name,
    value: item.value_plus,
  };
});

let minus_pie = props.list.map((item) => {
  return {
    name: item.name,
    value: item.value_minus,
  };
});

const option = {
  title: {
    text: '帖子得-扣分情况',
    left: 'center',
    top: 'bottom',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c}',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: '得分情况',
      type: 'pie',
      center: ['25%', '50%'],
      stillShowZeroSum: false,
      data: plus_pie,
    },
    {
      name: '扣分情况',
      type: 'pie',
      center: ['75%', '50%'],
      stillShowZeroSum: false,
      data: minus_pie,
    },
  ],
};

onMounted(() => {
  let myChart = echarts.init(document.getElementById('myChart2'));
  myChart.setOption(option);
  window.onresize = function () {
    //自适应大小
    myChart.resize();
  };
});
</script>

<script lang="ts">
export default {
  name: 'point-module',
};
</script>

<style scoped>
.pie-chart-wrapper {
  padding: 10px;
  width: 30vw;
}
</style>
