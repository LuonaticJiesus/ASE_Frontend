<template>
  <DivideContainer>
    <template #main>
      <el-scrollbar>
        <div style="margin: 20px; position: relative; max-height: 79vh">
          <el-row style="display: flex; justify-content: left">
            <h1 style="margin: 10px">{{ post.title }}</h1>
          </el-row>
          <el-row style="display: block">
            <el-scrollbar>
              <!--              <vue3-tinymce-->
              <!--                style="-->
              <!--                  height: 80vh;-->
              <!--                  width: auto;-->
              <!--                  position: absolute;-->
              <!--                  left: 5px;-->
              <!--                  right: 5px;-->
              <!--                "-->
              <!--                v-model="post.txt"-->
              <!--                :setting="richSetting"-->
              <!--              ></vue3-tinymce>-->
              <v-md-preview-html
                style="text-align: start"
                :html="post.txt"
                preview-class="github-markdown-body"
              ></v-md-preview-html>
            </el-scrollbar>
            <el-row style="display: block">
              <div
                style="
                  box-shadow: rgba(58, 46, 68, 0.06) 0 15px 100px 0;
                  border: 0 solid #e7e7e7;
                  border-radius: 20px;
                  margin-top: 10px;
                  padding: 10px;
                "
              >
                <el-row align="middle">
                  <el-col :span="2">
                    <el-avatar :src="userAvatar"></el-avatar>
                  </el-col>
                  <el-col :span="20">
                    <el-input
                      v-model="newComment"
                      placeholder="请输入评论"
                      clearable
                      type="textarea"
                      maxlength="200"
                      show-word-limit
                      :autosize="{ minRows: 1, maxRows: 3 }"
                    ></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button @click="handleCreateComment"> 评论</el-button>
                  </el-col>
                </el-row>
              </div>
              <CommentZone :permission="permission"></CommentZone>
            </el-row>
          </el-row>
        </div>
      </el-scrollbar>
    </template>
    <template #right>
      <div style="margin: 10px">
        <el-row>
          <h3>发布者</h3>
        </el-row>
        <el-row align="middle">
          <el-col :span="4">
            <el-avatar :src="creatorAvatar"></el-avatar>
          </el-col>
          <el-col :offset="1" :span="4">
            <h4 style="margin: 0">{{ post.user_name }}</h4>
          </el-col>
        </el-row>
        <el-row>
          <h3>发布时间</h3>
        </el-row>
        <el-row>
          <el-date-picker readonly :model-value="post.time"></el-date-picker>
        </el-row>
        <el-row style="margin-top: 20px" justify="space-around" align="middle">
          <!--          点赞-->
          <el-col :span="4">
            <el-row justify="center">
              <el-tooltip
                effect="dark"
                :content="isLiked ? '取消点赞' : '点赞'"
              >
                <el-button
                  size="large"
                  circle
                  type="primary"
                  :plain="!isLiked"
                  @click="handleLikePost"
                >
                  <el-icon>
                    <MagicStick />
                  </el-icon>
                </el-button>
              </el-tooltip>
            </el-row>
            <el-row justify="center" style="margin-top: 4px">
              <el-text class="post-state-info-text">{{
                post.like_cnt
              }}</el-text>
            </el-row>
          </el-col>
          <!--          收藏-->
          <el-col :span="4">
            <el-row justify="center">
              <el-tooltip
                effect="dark"
                :content="isFavored ? '取消收藏' : '收藏'"
              >
                <el-button
                  size="large"
                  circle
                  type="primary"
                  :plain="!isFavored"
                  @click="handleFavorPost"
                >
                  <el-icon>
                    <Star />
                  </el-icon>
                </el-button>
              </el-tooltip>
            </el-row>
            <el-row justify="center" style="margin-top: 4px">
              <el-text class="post-state-info-text">{{
                post.favor_cnt
              }}</el-text>
            </el-row>
          </el-col>
          <!--          分享-->
          <el-col :span="4">
            <el-row justify="center">
              <el-tooltip effect="dark" content="分享">
                <el-button
                  size="large"
                  circle
                  type="primary"
                  plain
                  @click="copy()"
                >
                  <el-icon>
                    <Share />
                  </el-icon>
                </el-button>
              </el-tooltip>
            </el-row>
            <el-row style="margin-top: 4px">
              <span style="visibility: hidden" class="post-state-info-text"
                >0</span
              >
            </el-row>
          </el-col>
          <!--          加精-->
          <el-col :span="4">
            <el-row justify="center">
              <el-tooltip
                effect="dark"
                :content="isChosen ? '已加精' : '未加精'"
              >
                <el-button
                  size="large"
                  circle
                  type="primary"
                  :plain="!isChosen"
                  @click="handleChoosePost()"
                >
                  <el-icon><DocumentChecked /></el-icon>
                </el-button>
              </el-tooltip>
            </el-row>
            <el-row justify="center" style="margin-top: 4px">
              <el-text class="post-state-info-text" style="visibility: hidden"
                >0</el-text
              >
            </el-row>
          </el-col>
          <!--          删除-->
          <el-col :span="4" v-if="permission >= 2">
            <el-row justify="center">
              <el-tooltip effect="dark" content="删除">
                <el-button
                  size="large"
                  circle
                  type="danger"
                  plain
                  @click="handleDeletePost"
                >
                  <el-icon>
                    <Delete />
                  </el-icon>
                </el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <span style="visibility: hidden">0</span>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </template>
  </DivideContainer>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import { onMounted, Ref, ref } from 'vue';
import router from '/@/router/index.js';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
// import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import {
  Delete,
  DocumentChecked,
  MagicStick,
  Share,
  Star,
} from '@element-plus/icons-vue';
import {
  articleDetail,
  changePostFavor,
  changePostLike,
  choosePost,
  deleteArticle,
} from '/@/api/article';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { defaultLogo } from '/@/utils/string';
import CommentZone from '/@/view/comment/index.vue';
import { createComment } from '/@/api/comment.js';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import 'element-plus/theme-chalk/el-notification.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-message.css';
import { queryRole } from '/@/api/permission.js';
import useClipboard from 'vue-clipboard3';
import { useUserStore } from '/@/store/index.js';
import { postDetailType } from '/@/utils/type';
// const richSetting = {
//   language: 'zh-Hans',
//   language_url:
//     'https://unpkg.com/@jsdawn/vue3-tinymce@2.0.2/dist/tinymce/langs/zh-Hans.js',
//   menubar: false,
//   toolbar: false,
//   plugins: 'codesample link image table lists autoresize',
//   nonbreaking_force_tab: true,
//   link_title: false,
//   link_default_target: '_blank',
//   content_style: 'body{font-size: 16px}',
//   readonly: true,
//   content_css: '/src/style/github.css',
// };
const { toClipboard } = useClipboard();
const copy = async () => {
  try {
    const text = location.href;
    await toClipboard(text); //实现复制
    ElNotification({
      title: '已复制分享链接',
    });
    console.log('Success');
  } catch (e) {
    ElNotification({
      title: '分享失败，请检查网络',
    });
  }
};

const creatorAvatar = ref(defaultLogo);
const userAvatar = useUserStore().avatar;
const newComment = ref('');
const handleCreateComment = async () => {
  if (newComment.value.trim().length === 0) {
    ElMessage.error({
      message: '什么都没有输入哦',
    });
    return;
  }
  const data = {
    post_id: post.value.post_id,
    txt: newComment.value,
  };
  const headers = {
    userid: getLocalUserId(),
    token: getToken(),
  };
  await createComment(data, headers)
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
const post_id = router.currentRoute.value.params['id'];
const block_id = ref(0);
const headers = {
  userid: getLocalUserId(),
  token: getToken(),
};

const post: Ref<postDetailType> = ref({
  block_id: 0,
  block_name: '',
  chosen_state: 0,
  comment_cnt: 0,
  favor_cnt: 0,
  favor_state: 0,
  latest_time: '',
  latest_update_user: '',
  like_cnt: 0,
  like_state: 0,
  post_id: 0,
  time: '',
  title: '',
  txt: '',
  user_id: 0,
  user_name: '',
});

const isLiked = ref(false);
const isFavored = ref(false);
const isChosen = ref(false);

const handleLikePost = async () => {
  const data = {
    post_id: post_id,
  };
  await changePostLike(data, headers);
  if (isLiked.value) {
    post.value.like_cnt -= 1;
  } else {
    post.value.like_cnt += 1;
  }
  isLiked.value = !isLiked.value;
};

const handleFavorPost = async () => {
  const data = {
    post_id: post_id,
  };
  await changePostFavor(data, headers);
  if (isFavored.value) {
    post.value.favor_cnt -= 1;
  } else {
    post.value.favor_cnt += 1;
  }
  isFavored.value = !isFavored.value;
};

const handleChoosePost = async () => {
  const data = {
    post_id: post_id,
  };
  if (permission.value <= 1) {
    ElMessage({
      type: 'error',
      message: '权限不足',
    });
    return;
  }
  ElMessageBox.confirm('确定加精该文章?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    choosePost(headers, data);
    isChosen.value = !isChosen.value;
  });
};

const handleDeletePost = async () => {
  ElMessageBox.confirm('确定删除该文章?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteArticle(post_id, getLocalUserId(), getToken()).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
    });
  });
};

const fetchData = async (post_id) => {
  console.log('post/preview.vue fetchData...');
  await articleDetail(post_id, getLocalUserId(), getToken())
    .then((res) => {
      console.log('post/preview.vue query article success: ', res);
      post.value = res[0];
      block_id.value = res[0].block_id;
      console.log(post);
      isLiked.value = post.value.like_state === 1;
      isFavored.value = post.value.favor_state === 1;
      isChosen.value = post.value.chosen_state === 1;
      creatorAvatar.value = post.value.user_avatar
        ? post.value.user_avatar
        : defaultLogo;
    })
    .catch((err) => {
      console.log('post/preview.vue query article fail: ', err);
    });
};

const permission = ref(-1);
const getUserRole = async () => {
  console.log('block_id is: ' + block_id.value);
  const result = await queryRole(block_id.value);
  console.log('permission is ', result);
  if (result) {
    permission.value = result;
  }
};

onMounted(async () => {
  let post_id = router.currentRoute.value.params['id'];
  console.log(post_id);
  await fetchData(post_id);
  await getUserRole();
  console.log(post);
});
</script>

<script lang="ts">
export default {
  name: 'PostPreview',
};
</script>

<style scoped>
.post-state-info-text {
  border-radius: 50px;
  font-size: 85%;
  padding: 0 6px 0 6px;
  text-align: center;
  line-height: 1;
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
