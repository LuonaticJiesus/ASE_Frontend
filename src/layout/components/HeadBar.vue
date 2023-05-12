<template>
  <div class="head-bar-div">
    <el-menu
      :default-active="$router.currentRoute.value.path"
      style="height: 100%"
      active-text-color="blueviolet"
      background-color="white"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <div style="display: flex; align-items: center">
        <!--suppress TypeScriptValidateTypes -->
        <el-input
          v-model="input2"
          placeholder="Please Input"
          :prefix-icon="Search"
          class="custom-input"
          disabled
        />
      </div>
      <div class="flex-grow" />
      <el-menu-item index="/home"><h3>首页</h3></el-menu-item>
      <el-menu-item index="/editor"><h3>发布</h3></el-menu-item>
      <el-menu-item index="/module"><h3>版块</h3></el-menu-item>
      <el-menu-item index="/user">
        <el-avatar class="mr-3" :size="32" :src="useUserStore().avatar" />
        <div
          class="text-large font-600 mr-3"
          style="margin-left: 10px; font-size: 16px"
        >
          {{ this.userName }}
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { getUserProfile } from '/@/api/user';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { useUserStore } from '/@/store';
import router from '/@/router';

export default {
  data() {
    return {
      userName: '',
    };
  },
  setup() {
    const input2 = ref('');
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
      router.push(key);
    };
    return {
      input2,
      handleSelect,
      useUserStore,
    };
  },
  computed: {
    Search() {
      return Search;
    },
  },
  methods: {
    async fetchData() {
      try {
        const userProfile = await getUserProfile({
          userid: getLocalUserId(),
          token: getToken(),
        });
        // console.log(userProfile);
        // console.log('headBar test profile:');
        this.userName = userProfile.name;
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

<style scoped>
.head-bar-div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  border: 2px;
  background-color: rgba(203, 32, 32, 0);
  margin: 0;
}
.flex-grow {
  flex-grow: 1;
}
.custom-input {
  font-size: 16px;
  height: 50%;
  width: 450px;
  margin-left: 50px;
  box-shadow: 0 2px 0 0 #e5e5e5;
}
.custom-input :deep(.el-input__wrapper) {
  background-color: #f9f3f9;
}

.el-menu-item:hover {
  outline: 0 !important;
  color: blueviolet !important;
}

.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0 !important;
  color: blueviolet !important;
  background: none !important;
}
</style>
