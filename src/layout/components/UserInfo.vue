<template>
  <div class="user-info-div">
    <el-row type="flex">
      <el-col>
        <el-row justify="center">
          <el-image
            style="
              border-radius: 50%;
              width: 60px;
              height: 60px;
              border: 4px solid white;
              outline: 1px solid gray;
            "
            :src="useUserStore().avatar"
            :fit="'scale-down'"
            lazy
          >
          </el-image>
        </el-row>
        <el-row justify="center" style="margin-top: 5px; font-weight: bold">
          {{ this.userName }}
        </el-row>
        <el-divider style="margin-top: 5px; margin-bottom: 5px"></el-divider>
        <el-row>
          <el-col :span="12">
            <el-row justify="center" style="font-size: small">
              {{ this.subscribeCnt }}
            </el-row>
            <el-row
              type="flex"
              justify="center"
              style="font-size: smaller; color: gainsboro"
            >
              已订阅
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row justify="center" style="font-size: small">
              {{ this.postCnt }}
            </el-row>
            <el-row
              type="flex"
              justify="center"
              style="font-size: smaller; color: gainsboro"
            >
              已发布
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { getLocalUserId, getToken } from '/@/utils/auth';
import { getUserProfile, querySubscribe } from '/@/api/user';
import { useUserStore } from '/@/store';
import { userArticles } from '/@/api/article';

export default {
  name: 'userInfo',
  data() {
    return {
      userName: '',
      subscribeCnt: 0,
      postCnt: 0,
    };
  },
  methods: {
    useUserStore,
    async fetchData() {
      try {
        const userid = getLocalUserId();
        const token = getToken();
        const userProfile = await getUserProfile({
          userid: userid,
          token: token,
        });
        this.userName = userProfile.name;
        const userSubscribes = await querySubscribe(userid, token, userid);
        console.log(userSubscribes);
        this.subscribeCnt = userSubscribes.length;
        const userPostGetter = await userArticles(userid, token);
        console.log(userPostGetter);
        this.postCnt = userPostGetter.length;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // 根据需要处理错误
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
.user-info-div {
  width: 10vw;
  height: 20vh;
  background-color: white;
  border-radius: 12px;
  position: absolute;
  padding: 16px 14px 36px 14px;
  top: 27vh;
  bottom: auto;
  transform-style: preserve-3d;
  border: solid #e7e7e7 1px;
  margin-top: -10px;
}

.user-info-div::before {
  content: '';
  width: 94%;
  height: 25vh;
  position: absolute;
  left: 3%;
  right: 3%;
  background-color: white;
  border-radius: 12px;
  box-shadow: rgba(58, 46, 68, 0.06) 0 15px 100px 0;
  transform: translateZ(-1px);
}
</style>
