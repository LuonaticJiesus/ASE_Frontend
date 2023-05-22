<template>
  <el-divider></el-divider>
  <!--    评论本体-->
  <el-row align="middle">
    <el-col :span="2">
      <el-avatar
        :src="commentItem.user_avatar ? commentItem.user_avatar : defaultLogo"
        size="large"
      ></el-avatar>
    </el-col>
    <el-col :span="10">
      <el-row justify="start">
        <el-col>
          <h4 style="margin: 0; text-align: left">
            {{ commentItem.user_name }} ▶ {{ commentItem.reply_user_name }}
          </h4>
        </el-col>
      </el-row>
      <el-row justify="start">
        <span style="color: gray; font-size: small">
          {{ getDateDiff(commentItem.time) }}
        </span>
      </el-row>
    </el-col>
    <!--    <el-col :span="2">-->
    <!--      <el-avatar> </el-avatar>-->
    <!--    </el-col>-->
  </el-row>
  <el-row justify="start">
    <el-col :offset="2" :span="22" style="text-align: left">
      <span style="text-align: left"> {{ commentItem.txt }}</span>
    </el-col>
  </el-row>
  <el-row justify="start">
    <el-col style="text-align: end">
      <el-tooltip effect="dark" :content="isLiked ? '取消点赞' : '点赞'">
        <el-button
          type="primary"
          :dark="isLiked"
          plain
          @click="handleLikeComment"
        >
          <div v-if="!isLiked" v-html="likeSVG"></div>
          <div v-else v-html="whiteLikeSVG"></div>
        </el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="评论">
        <el-button
          type="info"
          plain
          @click="showParentCommentEditor(commentItem)"
        >
          <el-icon size="16"><ChatDotSquare /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="删除"
        v-if="
          permission >= 2 ||
          commentItem.user_id === Number(useUserStore().user_id)
        "
      >
        <el-button type="danger" plain @click="handleDeleteComment">
          <el-icon><Delete /></el-icon>
        </el-button>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import {
  defaultLogo,
  getDateDiff,
  likeSVG,
  whiteLikeSVG,
} from '/@/utils/string';
import { deleteComment, likeComment } from '/@/api/comment';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { ChatDotSquare, Delete } from '@element-plus/icons-vue';
import { useUserStore } from '/@/store';

interface commentType {
  comment_id: number;
  user_id: number;
  post_id: number;
  parent_id: number | null;
  txt: string;
  time: string;
  user_name: string;
  like_cnt: number;
  like_state: number;
  user_avatar?: string;
  children?: commentType[];
  reply_user_name?: string;
}

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  commentItem: {
    type: Object as PropType<commentType>,
    default: Object,
  },
  permission: {
    type: Number,
    default: -1,
  },
  showParentCommentEditor: {
    type: Function,
    default: () => {
      return 0;
    },
  },
});

const isLiked = ref(props.commentItem.like_state === 1);

const handleLikeComment = async () => {
  const data = {
    comment_id: props.commentItem.comment_id,
  };
  const headers = {
    userid: getLocalUserId(),
    token: getToken(),
  };
  await likeComment(data, headers);
  isLiked.value = !isLiked.value;
};

const handleDeleteComment = async () => {
  const data = {
    comment_id: props.commentItem.comment_id,
  };
  const headers = {
    userid: getLocalUserId(),
    token: getToken(),
  };
  await deleteComment(data, headers);
};
</script>
<script lang="ts">
export default {
  name: 'SubComment',
};
</script>

<style scoped></style>
