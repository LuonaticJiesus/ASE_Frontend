<template>
  <!--  这是一级评论-->
  <!--  二级评论为什么不复用一级评论组件而要写重复代码呢？因为b站就是不复用、分开写的！-->
  <div style="padding: 0; z-index: 0">
    <!--    评论本体-->
    <el-tooltip
      :content="
        showSubComment
          ? '收起回复'
          : '显示所有回复，共' + tempComment.children.length + '条'
      "
      placement="top"
    >
      <div class="comment-body" @click="handleSubCommentShow">
        <el-row align="middle">
          <el-col :span="2">
            <el-avatar
              :src="
                tempComment.user_avatar ? tempComment.user_avatar : defaultLogo
              "
              size="large"
              style="z-index: 2"
            ></el-avatar>
          </el-col>
          <el-col :span="10">
            <el-row justify="start">
              <el-col>
                <h4 style="margin: 0; text-align: left">
                  {{ tempComment.user_name }}
                </h4>
              </el-col>
            </el-row>
            <el-row justify="start">
              <span style="color: gray; font-size: small">
                {{ getDateDiff(tempComment.time) }}
              </span>
            </el-row>
          </el-col>
        </el-row>
        <el-row justify="start">
          <el-col :offset="2" :span="22" style="text-align: left">
            <el-text style="text-align: left"> {{ tempComment.txt }}</el-text>
          </el-col>
        </el-row>
        <el-row justify="start" style="margin-bottom: 10px">
          <el-col style="text-align: end">
            <el-tooltip effect="dark" :content="isLiked ? '取消点赞' : '点赞'">
              <el-button
                type="primary"
                :plain="!isLiked"
                @click.stop="handleLikeComment"
              >
                <el-icon size="16"><MagicStick /></el-icon>
                <span>{{ tempComment.like_cnt }}</span>
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="评论">
              <el-button
                type="info"
                plain
                @click.stop="handleCommentEditorShow"
              >
                <el-icon size="16"><ChatDotSquare /></el-icon>
                <span>{{ tempComment.children.length }}</span>
              </el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除"
              v-if="
                permission >= 2 ||
                tempComment.user_id === Number(useUserStore().user_id)
              "
            >
              <el-button type="danger" plain @click.stop="handleDeleteComment">
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </el-tooltip>
    <!--    插入子评论-->
    <el-row v-show="showSubComment">
      <el-col :offset="2" :span="22">
        <SubComment
          v-for="subItem of tempComment.children"
          :key="subItem.comment_id"
          :permission="permission"
          :comment-item="subItem"
          :show-parent-comment-editor="handleSubCommentEditorShow"
        ></SubComment>
      </el-col>
    </el-row>

    <!--    回复评论输入框-->
    <div
      v-show="useCommentStore().activeCommentId === tempComment.comment_id"
      class="comment-input"
      @blur="handleSubCommentEditorHidden"
    >
      <el-row align="middle">
        <el-col :span="2">
          <el-avatar :src="useUserStore().avatar"></el-avatar>
        </el-col>
        <el-col :span="20">
          <el-input
            ref="subCommentInput"
            v-model="newComment"
            :placeholder="defaultTxt"
            maxlength="200"
            show-word-limit
            :autosize="{ minRows: 1, maxRows: 3 }"
          >
            <template #suffix>
              <Vue3Emoji
                size="small"
                :recent="true"
                @click-emoji="appendEmojiToText"
                :options-name="emojiOptionsName"
              />
            </template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button @mousedown="handleCreateComment">评论</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, ref, UnwrapRef } from 'vue';
import { useCommentStore, useUserStore } from '/@/store';
import router from '/@/router';
import SubComment from '/@/view/comment/subComment.vue';
import { createComment, deleteComment, likeComment } from '/@/api/comment';
import { defaultLogo, getDateDiff } from '/@/utils/string';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { ChatDotSquare, Delete, MagicStick } from '@element-plus/icons-vue';
import { ElMessage, ElNotification } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import { commentType } from '/@/utils/type';
import Vue3Emoji from 'vue3-emoji';
import 'vue3-emoji/dist/style.css';

const emojiOptionsName = {
  'Smileys & Emotion': '笑脸&表情',
  'Food & Drink': '食物&饮料',
  'Animals & Nature': '动物&自然',
  'Travel & Places': '旅行&地点',
  'People & Body': '人物&身体',
  Objects: '物品',
  Symbols: '符号',
  Flags: '旗帜',
  Activities: '活动',
};

const appendEmojiToText = (emoji: string) => {
  newComment.value += emoji;
};

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

const tempComment: Ref<UnwrapRef<commentType>> = ref(props.commentItem);
const isLiked = ref(tempComment.value.like_state === 1);
const newComment = ref('');
const defaultTxt = ref('请输入评论');
const showSubComment = ref(false);

const handleSubCommentShow = async () => {
  console.log(showSubComment.value);
  showSubComment.value = !showSubComment.value;
};

const handleLikeComment = async () => {
  const data = {
    comment_id: tempComment.value.comment_id,
  };
  const headers = {
    userid: getLocalUserId(),
    token: getToken(),
  };
  await likeComment(data, headers);
  if (isLiked.value) {
    tempComment.value.like_cnt -= 1;
  } else {
    tempComment.value.like_cnt += 1;
  }
  isLiked.value = !isLiked.value;
};

const handleCommentEditorShow = async () => {
  const item = tempComment.value;
  useCommentStore().setActiveCommentId(item.comment_id);
  useCommentStore().setReplyCommentId(item.comment_id);
  defaultTxt.value = '回复:@' + item.user_name;
  subCommentInput.value.focus();
};

const subCommentInput = ref();

const handleSubCommentEditorShow = async (subComment) => {
  const item = tempComment.value;
  console.log(subComment);
  useCommentStore().setActiveCommentId(item.comment_id);
  useCommentStore().setReplyCommentId(subComment.comment_id);
  defaultTxt.value = '回复:@' + subComment.user_name;
  subCommentInput.value.focus();
};

const handleSubCommentEditorHidden = async () => {
  useCommentStore().setActiveCommentId(-1);
  useCommentStore().setReplyCommentId(-1);
};

const handleCreateComment = async () => {
  if (newComment.value.trim().length === 0) {
    ElMessage.error({
      message: '什么都没有输入哦',
    });
    return;
  }
  const data = {
    post_id: router.currentRoute.value.params['id'],
    parent_id: useCommentStore().replyCommentId,
    txt: newComment.value,
  };
  const headers = {
    userid: getLocalUserId(),
    token: getToken(),
  };
  createComment(data, headers)
    .then((res) => {
      console.log('Create comment success ' + res);
      ElNotification({
        title: '评论成功',
      });
      location.reload();
    })
    .catch((err) => {
      console.log('Create comment failed ' + err);
      ElNotification({
        title: '评论失败',
      });
    });
};

const handleDeleteComment = async () => {
  const data = {
    comment_id: tempComment.value.comment_id,
  };
  const headers = {
    userid: getLocalUserId(),
    token: getToken(),
  };
  deleteComment(data, headers)
    .then((res) => {
      console.log('Create comment success ' + res);
      ElNotification({
        title: '删除成功',
      });
      location.reload();
    })
    .catch((err) => {
      console.log('Create comment failed ' + err);
      ElNotification({
        title: '删除失败',
      });
    });
};
</script>

<script lang="ts">
export default {
  name: 'CommentBox',
};
</script>

<style scoped>
.comment-body {
  padding: 10px;
  border-style: solid;
  border-width: 0 0 0px 0;
  border-color: #e7e7e7;
  background-color: white;
}
.comment-body:hover {
  cursor: pointer;
  background-color: #e7e7e7;
  padding: 10px;
}
.comment-input {
  box-shadow: rgba(58, 46, 68, 0.05) 0 20px 90px 0;
  margin: 0 30px 0 30px;
  padding: 10px;
  position: fixed;
  z-index: 9999;
  bottom: 1vh;
  min-width: 50em;
  /*background-image: linear-gradient(-135deg, #7028e4 0%, #e5b2ca 100%);*/
  background-image: linear-gradient(
    135deg,
    #dfe9f3 0%,
    var(--el-color-primary-light-10) 100%
  );
  border-radius: 20px;
  border-style: solid;
  border-width: 0;
  border-color: white;
}
</style>
