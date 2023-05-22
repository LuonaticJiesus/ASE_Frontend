<template>
  <h2>评论区</h2>
  <CommentBox
    v-for="item of commentList"
    :commentItem="item"
    :permission="permission"
    :key="item"
  />
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

<style scoped></style>
