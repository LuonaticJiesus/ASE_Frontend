<template>
  <div class="comment-area">
    <div class="comment-header">
      <h2 style="margin: 0; color: #1a1a1a; line-height: 5vh">评论区</h2>
    </div>
    <div class="comment-list">
      <CommentBox
        v-for="item of commentList"
        :commentItem="item"
        :permission="permission"
        :key="item.comment_id"
      />
      <el-empty v-if="commentList.length === 0" description="还没有评论哦" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '/@/router';
import { queryCommentList } from '/@/api/comment';
import { getLocalUserId, getToken } from '/@/utils/auth';

const postId = router.currentRoute.value.params['id'];

defineProps({
  permission: {
    type: Number,
    default: -1,
  },
});

const headers = {
  userid: getLocalUserId(),
  token: getToken(),
};

const commentList = ref([]);

const fetchCommentList = async () => {
  const params = { post_id: postId };
  const result = await queryCommentList(params, headers);
  if (result) {
    commentList.value = result;
  }
};

onMounted(async () => {
  await fetchCommentList();
});
</script>

<script lang="ts">
import CommentBox from '/@/view/comment/comment.vue';

export default {
  name: 'CommentZone',
  components: { CommentBox },
};
</script>

<style scoped>
.comment-header {
  margin: 0;
  padding: 2px;
  height: 5vh;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #e7e7e7;
  border-radius: 12px 12px 0 0;
}
.comment-area {
  margin-top: 20px;
  margin-bottom: 1vh;
  padding: 0;
  border-style: solid;
  border-width: 0;
  border-color: #bebebe;
  box-shadow: rgba(12, 9, 14, 0.04) 0 15px 40px 0;
  border-radius: 0 0 12px 12px;
}
</style>
