<template>
  <div>
    <!--    ”您关注的模块” + sender_name + “有新帖发布啦！“ + related_content-->
    <div v-if="message.message_type === 101">
      <span>您关注的模块{{ ' ' }} </span>
      <a>{{ message.sender_name }}</a>
      <span>{{ ' ' }}有新帖发布:{{ ' ' }}</span>
      <a>{{ message.related_content }}</a>
    </div>
    <!--    ”您关注的模块”+sender_name+“有新通知！“ + related_content-->
    <div v-else-if="message.message_type === 102">
      <span>您关注的模块{{ ' ' }} </span>
      <a>{{ message.sender_name }}</a>
      <span>{{ ' ' }}有新通知:{{ ' ' }}</span>
      <a>{{ message.related_content }}</a>
    </div>
    <!--    ”您在“+source_content+”下的权限已更改“ 为 “related_content => role_name(这步转换前端负责）”-->
    <div v-else-if="message.message_type === 103">
      <span>您在{{ ' ' }} </span>
      <a>{{ message.source_content }}</a>
      <span>{{ ' ' }}下的权限已被更改为:{{ ' ' }}</span>
      <span>{{ role_name(message.related_content) }}</span>
    </div>
    <!--    ”您关注的模块”+source_content+“已被删除“-->
    <div v-else-if="message.message_type === 104">
      <span>您关注的模块{{ ' ' }} </span>
      <span class="disable-a">{{ message.source_content }}</span>
      <span>{{ ' ' }}已被删除</span>
    </div>
    <!--    ”您发布了一篇帖子，消耗积分“ + point-->
    <div v-else-if="message.message_type === 201">
      <span>您发布了一篇帖子，消耗积分{{ -1 * message.point }} </span>
    </div>
    <!--  ”您的帖子”+source_content+“被加精了“-->
    <div v-else-if="message.message_type === 202">
      <span>您的帖子{{ ' ' }} </span>
      <a>{{ message.source_content }}</a>
      <span>{{ ' ' }}被加精了</span>
    </div>
    <!--    ”您的帖子”+source_content+“被加精了，积分增加“ + point-->
    <div v-else-if="message.message_type === 203">
      <span>您的帖子{{ ' ' }} </span>
      <a>{{ message.source_content }}</a>
      <span>{{ ' ' }}被加精了，积分增加{{ message.point }}</span>
    </div>
    <!--    ”您的帖子“+source_content+被取消加精了“-->
    <div v-else-if="message.message_type === 204">
      <span>您的帖子{{ ' ' }} </span>
      <a>{{ message.source_content }}</a>
      <span>{{ ' ' }}被取消加精了</span>
    </div>

    <!--    ”您的帖子“+source_content+”因==不合规==被删除了，“-->
    <div v-else-if="message.message_type === 205">
      <span>您的帖子{{ ' ' }} </span>
      <span class="disable-a">{{ message.source_content }}</span>
      <span>{{ ' ' }}因不合规或其他原因被删除，详细信息请联系管理员</span>
    </div>
    <!--    	”由于您的帖子被删除了，您的积分减少“ + point-->
    <div v-else-if="message.message_type === 206">
      <span>由于您的帖子{{ ' ' }} </span>
      <span class="disable-a">{{ message.source_content }}</span>
      <span>{{ ' ' }}被删除，您的积分减少{{ -1 * message.point }}</span>
    </div>
    <!--    ”您的帖子“ + source_content + ”收到一条评论“ + related_content-->
    <div v-else-if="message.message_type === 207">
      <span>您的帖子{{ ' ' }} </span>
      <a>{{ message.source_content }}</a>
      <span>{{ ' ' }}收到一条评论:{{ ' ' + message.related_content }}</span>
    </div>
    <!--    	”您的帖子“ + source_content + ”收到一条评论，积分增加“ + point-->
    <div v-else-if="message.message_type === 208">
      <span>您的帖子{{ ' ' }} </span>
      <a>{{ message.source_content }}</a>
      <span>{{ ' ' }}收到一条评论，积分增加{{ message.point }}</span>
    </div>
    <!--    ”您的帖子“+source_content+被取消加精了，积分减少“ + point-->
    <div v-else-if="message.message_type === 209">
      <span>由于您的帖子{{ ' ' }} </span>
      <a>{{ message.source_content }}</a>
      <span>{{ ' ' }}被取消加精了，积分扣除{{ -1 * message.point }}</span>
    </div>
    <!--    ”您的帖子“ + source_content + ”收到一条点赞，积分增加“ + point-->
    <div v-else-if="message.message_type === 210">
      <span>您的帖子{{ ' ' }} </span>
      <a>{{ message.source_content }}</a>
      <span>{{ ' ' }}收到一条点赞，积分增加{{ message.point }}</span>
    </div>
    <!--    	”您发布了一条评论，消耗积分“ + point-->
    <div v-else-if="message.message_type === 301">
      <span>您发布了一条评论，消耗积分{{ ' ' }} </span>
      <span>{{ -1 * message.point }}</span>
    </div>
    <!--    ”您发表在“ + source_content + ”的评论“ + related_content+ ”被删除了“-->
    <div v-else-if="message.message_type === 302">
      <span>您发表在{{ ' ' }} </span>
      <a>{{ message.source_content }}</a>
      <span>{{ ' ' }}的评论：</span>
      <span>{{ ' ' + message.related_content + ' ' }}被删除了</span>
    </div>
    <!--    ”您的评论被删除，积分减少“ + point-->
    <div v-else-if="message.message_type === 303">
      <span>由于您的评论被删除，积分扣除{{ ' ' }} </span>
      <span>{{ -1 * message.point }}</span>
    </div>
    <!--    ”您收到了一条评论”+related_content-->
    <div v-else-if="message.message_type === 304">
      <span>您收到了一条评论{{ ' ' }} </span>
      <span>{{ message.related_content }}</span>
    </div>
    <!--    ”您收到了一条评论，积分增加” + point-->
    <div v-else-if="message.message_type === 305">
      <span>您收到了一条评论，积分增加{{ ' ' }} </span>
      <span>{{ message.point }}</span>
    </div>
    <!--    ”今日登录，积分增加” + point-->
    <div v-else-if="message.message_type === 401">
      <span>今日登录，积分增加{{ ' ' }} </span>
      <span>{{ message.point }}</span>
    </div>
    <div v-else>{{ message.message_type }}</div>
  </div>
</template>

<script setup lang="ts">
import { messageType } from '/@/utils/type';
import { PropType } from 'vue';
import { permissionMap } from '/@/api/permission';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  message: {
    type: Object as PropType<messageType>,
    default: Object,
  },
});

const role_name = (role) => {
  return permissionMap[Number(role)];
};
</script>
<script lang="ts">
export default {
  name: 'MessageContent',
};
</script>

<style scoped>
.message-center {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.disable-a {
  color: var(--el-color-primary);
}

a {
  color: var(--el-color-primary);
}
a:hover {
  color: var(--el-color-primary-light-5);
  text-decoration: underline;
  text-underline: var(--el-color-primary-light-5);
}
</style>
