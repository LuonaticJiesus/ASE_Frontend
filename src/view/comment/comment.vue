<template>
  <!--  这是一级评论-->
  <!--  二级评论为什么不复用一级评论组件而要写重复代码呢？因为b站就是不复用、分开写的！-->
  <div>
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
              {{ commentItem.user_name }}
            </h4>
          </el-col>
        </el-row>
        <el-row justify="start">
          <span style="color: gray; font-size: small">
            {{ getDateDiff(commentItem.time) }}
          </span>
        </el-row>
      </el-col>
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
          <el-button type="info" plain @click="handleCommentEditorShow">
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
    <!--    插入子评论-->
    <el-row>
      <el-col :offset="2" :span="22">
        <SubComment
          v-for="subItem of commentItem.children"
          :key="subItem.comment_id"
          :comment-item="subItem"
          :show-parent-comment-editor="handleSubCommentEditorShow"
        ></SubComment>
      </el-col>
    </el-row>
    <!--    回复评论输入框-->
    <el-row
      v-if="useCommentStore().activeCommentId === commentItem.comment_id"
      style="display: block"
    >
      <div
        style="
          box-shadow: rgba(58, 46, 68, 0.06) 0 15px 100px 0;
          border: 2px solid #e7e7e7;
          border-radius: 12px;
          margin-top: 10px;
          padding: 10px;
        "
      >
        <el-row align="middle">
          <el-col :span="2">
            <el-avatar :src="useUserStore().avatar"></el-avatar>
          </el-col>
          <el-col :span="20">
            <el-input
              v-model="newComment"
              :placeholder="defaultTxt"
              clearable
              type="textarea"
              maxlength="200"
              show-word-limit
              :autosize="{ minRows: 1, maxRows: 3 }"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-button @click="handleCreateComment"
              ><el-icon> <Check></Check> </el-icon
            ></el-button>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import {
  defaultLogo,
  getDateDiff,
  likeSVG,
  whiteLikeSVG,
} from '/@/utils/string';
import { createComment, deleteComment, likeComment } from '/@/api/comment';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { ChatDotSquare, Check, Delete } from '@element-plus/icons-vue';
import { useCommentStore, useUserStore } from '/@/store';
import router from '/@/router';
import SubComment from '/@/view/comment/subComment.vue';

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
});

const isLiked = ref(props.commentItem.like_state === 1);
const newComment = ref('');
const defaultTxt = ref('请输入评论');

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
const handleCommentEditorShow = async () => {
  const item = props.commentItem;
  useCommentStore().setActiveCommentId(item.comment_id);
  useCommentStore().setReplyCommentId(item.comment_id);
  defaultTxt.value = '回复:@' + item.user_name;
};

const handleSubCommentEditorShow = async (subComment) => {
  const item = props.commentItem;
  useCommentStore().setActiveCommentId(item.comment_id);
  useCommentStore().setReplyCommentId(subComment.comment_id);
  defaultTxt.value = '回复:@' + subComment.reply_user_name;
};
const handleCreateComment = async () => {
  const data = {
    post_id: router.currentRoute.value.params['id'],
    parent_id: useCommentStore().replyCommentId,
    txt: newComment.value,
  };
  const headers = {
    userid: getLocalUserId(),
    token: getToken(),
  };
  await createComment(data, headers);
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
  name: 'CommentBox',
};
</script>

<style scoped></style>
