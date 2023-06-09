<template>
  <div>
    <el-select-v2
      v-model="selected"
      :options="options"
      @change="handleSearch()"
    />
    <div id="myChart1" style="width: 65vw; height: 70vh"></div>
  </div>
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

const selected = ref('Option 1');
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
];

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
    // data: props.list.map((item) => new Date(item.time).toLocaleDateString()),
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

const chartOption = () => {
  chart.setOption(option);
  window.onresize = function () {
    //自适应大小，模板给的
    chart.resize();
  };
};

onMounted(() => {
  chart = echarts.init(document.getElementById('myChart1'));
  chartOption();
});

const emit = defineEmits(['refresh']);
const handleSearch = () => {
  console.log('refetch', selected.value);
  emit('refresh');
  chartOption();
  console.log(option);
};
</script>

<script lang="ts">
export default {
  name: 'point-time',
  methods: {},
};
</script>

<style scoped></style>
