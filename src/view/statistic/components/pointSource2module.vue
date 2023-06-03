<template>
  <div id="myChart2" style="width: 65vw; height: 70vh"></div>
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

const option = {
  title: {
    text: '积分来源-帖子',
  },
  series: [
    {
      type: 'pie',
      stillShowZeroSum: false,
      data: props.list,
    },
  ],
};

console.log(props.list);

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
  name: 'pointSource-module',
};
</script>

<style scoped></style>
