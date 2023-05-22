<template>
  <el-divider></el-divider>
  <!--    评论本体-->
  <el-row align="middle">
    <el-col :span="2">
      <el-avatar
        :src="tempComment.user_avatar ? tempComment.user_avatar : defaultLogo"
        size="large"
      ></el-avatar>
    </el-col>
    <el-col :span="10">
      <el-row justify="start">
        <el-col>
          <h4 style="margin: 0; text-align: left">
            {{ tempComment.user_name }} ▶ {{ tempComment.reply_user_name }}
          </h4>
        </el-col>
      </el-row>
      <el-row justify="start">
        <span style="color: gray; font-size: small">
          {{ getDateDiff(tempComment.time) }}
        </span>
      </el-row>
    </el-col>
    <!--    <el-col :span="2">-->
    <!--      <el-avatar> </el-avatar>-->
    <!--    </el-col>-->
  </el-row>
  <el-row justify="start">
    <el-col :offset="2" :span="22" style="text-align: left">
      <span style="text-align: left"> {{ tempComment.txt }}</span>
    </el-col>
  </el-row>
  <el-row justify="start">
    <el-col style="text-align: end">
      <el-tooltip effect="dark" :content="isLiked ? '取消点赞' : '点赞'">
        <el-button
          type="primary"
          :plain="!isLiked"
          @click="handleLikeComment"
          lazy
        >
          <el-icon><MagicStick /></el-icon>
          <span>{{ tempComment.like_cnt }}</span>
        </el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="评论">
        <el-button
          type="info"
          plain
          @click="showParentCommentEditor(tempComment)"
        >
          <el-icon size="16"><ChatDotSquare /></el-icon>
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
        <el-button type="danger" plain @click="handleDeleteComment">
          <el-icon><Delete /></el-icon>
        </el-button>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { PropType, Ref, ref, UnwrapRef } from 'vue';
import { defaultLogo, getDateDiff } from '/@/utils/string';
import { deleteComment, likeComment } from '/@/api/comment';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { ChatDotSquare, Delete, MagicStick } from '@element-plus/icons-vue';
import { useUserStore } from '/@/store';
import { ElNotification } from 'element-plus';

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

const tempComment: Ref<UnwrapRef<commentType>> = ref(props.commentItem);

const isLiked = ref(tempComment.value.like_state === 1);

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
  name: 'SubComment',
};
</script>

<style scoped></style>
