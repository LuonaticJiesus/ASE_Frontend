<template>
  <div class="pie-chart-wrapper">
    <div id="myChart3" style="width: 60vw; height: 70vh"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, PropType } from 'vue';
import { postModuleType } from '/@/utils/type';

const props = defineProps({
  list: {
    type: Array as PropType<postModuleType[]>,
    default: Array,
  },
});

const option = {
  title: {
    text: '发帖-模块',
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
      type: 'pie',
      stillShowZeroSum: false,
      data: props.list,
    },
  ],
};

onMounted(() => {
  let myChart = echarts.init(document.getElementById('myChart3'));
  myChart.setOption(option);
  window.onresize = function () {
    //自适应大小
    myChart.resize();
  };
});
</script>

<script lang="ts">
export default {
  name: 'post-module',
};
</script>

<style scoped>
.pie-chart-wrapper {
  flex: 1;
  padding: 10px;
  width: 30vw;
}
</style>
