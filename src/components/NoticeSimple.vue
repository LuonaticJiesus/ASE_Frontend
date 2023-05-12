<template>
  <el-card
    :key="noticeItem"
    class="notice-card-simple"
    shadow="hover"
    @click="jump"
  >
    <el-row justify="space-between">
      <el-col :span="6" class="notice-module-image">
        <el-image :src="defaultLogo" :fit="'fill'"></el-image>
      </el-col>
      <el-col :span="18" class="notice-info-div">
        <h4 class="notice-title-simple">
          {{ noticeItem.title }}
        </h4>
        <span class="notice-content-simple">
          {{ noticeItem.txt }}
        </span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { PropType } from 'vue';
import { defaultLogo } from '/@/utils/string';
import router from '/@/router';
interface noticeType {
  notice_id: number;
  title: string;
  txt: string;
  user_id: number;
  block_id: number;
  time: string;
  ddl: string;
}
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  noticeItem: {
    type: Object as PropType<noticeType>,
    default: Object,
  },
});

const jump = () => {
  router.push('/notice/' + props.noticeItem.notice_id);
};
// onMounted(() => {
//   console.log(props.noticeItem);
// });
</script>

<script lang="ts">
export default {
  name: 'NoticeSimple',
};
</script>

<style scoped>
.notice-card-simple {
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0);
  border-style: hidden;
}

.notice-module-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.notice-info-div {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
}

.notice-title-simple {
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  overflow: hidden;
  min-width: 100%;
}

.notice-content-simple {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #bebebe;
}

.el-image {
  max-width: 40px;
  max-height: 40px;
  border-radius: 20px;
}
</style>
