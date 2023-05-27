<template>
  <el-row>
    <el-col :span="2">
      <!--     头像：如果没有就用一个icon-->
      <el-avatar></el-avatar>
    </el-col>
    <el-col :span="22">
      <!--     详细内容-->
      <span style="display: flex; justify-content: start">
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <path
            d="M512 322c-104.92 0-190 85.08-190 190s85.08 190 190 190 190-85.06 190-190-85.08-190-190-190z"
            fill="#F5260B"
          ></path>
        </svg>

        <el-text style="color: black">
          {{
            '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容'
          }}
        </el-text>
      </span>

      <el-text>
        {{ '2个月前 · 模块名称 · 评论者' }}
      </el-text>
    </el-col>
  </el-row>
  <el-divider></el-divider>
</template>

<script setup lang="ts">
// 本组件拿到【单条消息】
import { PropType } from 'vue';
import { messageType } from '/@/utils/type';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  message: {
    type: Object as PropType<messageType>,
    default: Object,
  },
});
</script>
<script lang="ts">
export default {
  name: 'DetailMessageListItem',
};
</script>

<style scoped></style>
