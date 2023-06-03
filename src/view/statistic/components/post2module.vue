<template>
  <div id="myChart3" style="width: 65vw; height: 70vh"></div>
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

<style scoped></style>
