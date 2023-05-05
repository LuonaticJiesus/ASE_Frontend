<template>
  <DivideContainer>
    <template #main>
      <div style="margin: 20px; position: relative">
        <el-row style="display: flex; justify-content: left">
          <h1 style="margin: 10px">{{ post.title }}</h1>
        </el-row>
        <el-row style="display: block">
          <el-scrollbar max-height="61.5vh">
            <vue3-tinymce
              style="
                height: 80vh;
                width: auto;
                position: absolute;
                left: 5px;
                right: 5px;
              "
              v-model="post.txt"
              :setting="richSetting"
            ></vue3-tinymce>
          </el-scrollbar>
          <el-row style="display: block">
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
                  <el-avatar :src="avatar"></el-avatar>
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
                  <el-button @click="handleCreateComment"
                    ><el-icon> <Check></Check> </el-icon
                  ></el-button>
                </el-col>
              </el-row>
            </div>
          </el-row>
        </el-row>
      </div>
    </template>
    <template #right>
      <div style="margin: 10px">
        <el-row>
          <h3>发布者</h3>
        </el-row>
        <el-row align="middle">
          <el-col :span="4">
            <el-avatar :src="avatar"></el-avatar>
          </el-col>
          <el-col :offset="1" :span="4">
            <h4 style="margin: 0">{{ post.user_name }}</h4>
          </el-col>
        </el-row>
        <el-row>
          <h3>发布时间</h3>
        </el-row>
        <el-row>
          <el-date-picker readonly v-model="post.time"></el-date-picker>
        </el-row>
        <el-row style="margin-top: 20px" justify="space-around">
          <el-button
            size="large"
            circle
            type="success"
            :plain="likeState"
            @click="handleLikePost"
          >
            <el-icon>
              <Pointer />
            </el-icon>
          </el-button>
          <el-button
            size="large"
            circle
            type="success"
            :plain="favorSate"
            @click="handleFavorPost"
          >
            <el-icon>
              <Star />
            </el-icon>
          </el-button>
          <el-button size="large" circle type="success" plain>
            <el-icon>
              <Share />
            </el-icon>
          </el-button>
        </el-row>
      </div>
    </template>
  </DivideContainer>
</template>

<script setup>
/* eslint-disable camelcase */
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import { onMounted, ref } from 'vue';
import router from '/@/router/index.js';
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import { Check, Pointer, Share, Star } from '@element-plus/icons-vue';
import { articleDetail } from '/@/api/article';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { defaultLogo } from '/@/utils/string';

const richSetting = {
  language: 'zh-Hans',
  language_url:
    'https://unpkg.com/@jsdawn/vue3-tinymce@2.0.2/dist/tinymce/langs/zh-Hans.js',
  menubar: false,
  toolbar: false,
  plugins: 'codesample link image table lists autoresize',
  nonbreaking_force_tab: true,
  link_title: false,
  link_default_target: '_blank',
  content_style: 'body{font-size: 16px}',
  readonly: true,
};

const avatar = ref(defaultLogo);
const newComment = ref('');
const handleCreateComment = () => {
  return 1;
};
const likeState = ref(true);
const favorSate = ref(false);

const post = ref({
  post_id: Number,
  title: String,
  user_id: Number,
  user_name: String,
  txt: String,
  block_id: Number,
  block_name: String,
  time: String,
  like_cnt: Number,
  comment_cnt: Number,
  like_state: Number,
  latest_update_user: String,
  latest_time: String,
});

const handleLikePost = async () => {
  console.log('like');
  let post_id = router.currentRoute.value.params['id'];
};

const handleFavorPost = async () => {
  console.log('favor');
  let post_id = router.currentRoute.value.params['id'];
};

const fetchData = async (post_id) => {
  console.log('post/preview.vue fetchData...');
  articleDetail(post_id, getLocalUserId(), getToken())
    .then((res) => {
      console.log('post/preview.vue query article success: ', res);
      post.value = res;
    })
    .catch((err) => {
      console.log('post/preview.vue query article fail: ', err);
    });
};

onMounted(async () => {
  let post_id = router.currentRoute.value.params['id'];
  console.log(post_id);
  await fetchData(post_id);
  console.log(post);
});
</script>

<script>
export default {
  name: 'PostPreview',
};
</script>

<style scoped>
.DivideContainer {
  height: 100%;
}
</style>
