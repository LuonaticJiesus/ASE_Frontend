<template>
  <div class="tab-pane">
    <el-scrollbar>
      <div v-for="dateObj of dateMap" :key="dateObj.date">
        <h4 style="text-align: start">
          {{ new Date(dateObj.date).toLocaleDateString() }}
        </h4>
        <el-divider
          style="
            margin-bottom: 0;
            border-width: 2px;
            border-color: var(--el-color-primary-light-7);
          "
        ></el-divider>
        <DetailMessageListItem
          v-for="(item, index) of dateObj.messages"
          :key="item.message_id"
          :message="item"
          @click-message="confirm(index)"
        />
      </div>
      <el-empty
        v-if="list.length === 0"
        description="暂时没有收到消息"
      ></el-empty>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
// 本组件拿到【相同分类的所有消息】
import DetailMessageListItem from '/@/view/message/components/DetailMessageListItem.vue';
import { onMounted, PropType, Ref, ref } from 'vue';
import { messageType } from '/@/utils/type';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  list: {
    type: Array as PropType<messageType[]>,
    default: Array,
  },
});
/*
 dateMap=[
  {date:'2023-05-01', messages:[message1, message2, ...]},
  {date:'2023-04-29', messages:[message1, message2, ...]}
 ]
 */
interface dateMapType {
  date: string;
  messages: messageType[];
}
const dateMap: Ref<dateMapType[]> = ref([]);
onMounted(() => {
  let indexDate = '1969-01-01';
  let index = -1;
  for (let item of props.list) {
    let date = new Date(item.time).toDateString();
    if (date === indexDate) {
      dateMap.value[index].messages.push(item);
    } else {
      index += 1;
      dateMap.value.push({ date: date, messages: [] });
      dateMap.value[index].messages.push(item);
      indexDate = date;
    }
  }
});
const emit = defineEmits(['click-row', 'confirmAll']);
const confirm = (index: number) => {
  console.log('confirm(' + index + ')');
  emit('click-row', index);
};
</script>

<script lang="ts">
export default {
  name: 'DetailMessageTabPane',
};
</script>

<style scoped>
.tab-pane {
  height: 67vh;
}
</style>
