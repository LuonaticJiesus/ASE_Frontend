<template>
  <div class="comment-area">
    <div class="comment-header">
      <h2 style="margin: 0; color: blueviolet; line-height: 5vh">评论区</h2>
    </div>
    <div class="comment-list">
      <el-scrollbar height="82vh">
        <CommentBox
          v-for="item of commentList"
          :commentItem="item"
          :permission="permission"
          :key="item.comment_id"
        />
        <el-empty description="没有更多数据" />
      </el-scrollbar>
    </div>
  </div>
  <el-divider style="margin: 0; color: blueviolet"></el-divider>
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
  height: 5vh;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: blueviolet;
  background-color: rgb(245, 234, 255);
}
.comment-area {
  margin-top: 1vh;
  margin-bottom: 1vh;
  padding: 0;
  border-style: solid;
  border-width: 1px;
  border-color: blueviolet;
  box-shadow: 4px 4px 4px 1px rgba(245, 234, 255, 0.9);
}
</style>
