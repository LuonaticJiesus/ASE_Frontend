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
      <div
        v-if="$router.currentRoute.value.matched.length <= 2"
        style="display: flex; align-items: center"
      >
        <el-avatar :size="40" style="margin: 3vh" :src="this.userAvatar" />
        <span class="text-large font-600 mr-3">
          {{ this.userName }}
        </span>
      </div>
      <el-page-header
        style="display: flex; align-items: center; margin-left: 5vh"
        @back="goBack"
        v-if="$router.currentRoute.value.matched.length > 2"
      >
        <template #content>
          <div style="display: flex; align-items: center">
            <el-avatar :size="40" style="margin: 2vh" :src="this.userAvatar" />
            <span class="text-large font-600 mr-3">
              {{ this.userName }}
            </span>
            <!-- <span
              class="text-sm mr-2"
              style="color: var(--el-text-color-regular)"
            >
              Sub title
            </span> -->
            <!-- <el-tag>Default</el-tag> -->
          </div>
        </template>
        <!-- <template #extra>
          <div class="flex items-center">
            <el-button>Print</el-button>
            <el-button type="primary" class="ml-2">Edit</el-button>
          </div>
        </template> -->
      </el-page-header>
      <!-- <div style="display: flex; align-items: center">
        <el-input
          v-model="input2"
          placeholder="Please Input"
          :prefix-icon="Search"
          class="custom-input"
          disabled
        />
      </div> -->
      <div class="flex-grow" />
      <el-menu-item index="/home"><h3>主页</h3></el-menu-item>
      <el-popover
        trigger="hover"
        placement="bottom"
        :width="400"
        popper-style="border-radius: 12px;padding: 0"
        :show-arrow="false"
        v-if="$router.currentRoute.value.path !== '/message'"
      >
        <template #reference>
          <el-menu-item>
            <h3>消息</h3>
            <!-- <span class="redDot" v-if="unreadCount > 0"> </span> -->
          </el-menu-item>
        </template>
        <template #default>
          <HoverMessageBox :fetch-unread-count="handleUnreadCount"
        /></template>
      </el-popover>

      <el-menu-item index="/editor"><h3>发布</h3></el-menu-item>
      <el-menu-item index="/module"><h3>版块</h3></el-menu-item>
      <el-menu-item index="/favor"><h3>收藏</h3></el-menu-item>
      <el-menu-item index="/statistic"><h3>统计</h3></el-menu-item>
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
import { useUserStore } from '/@/store';
import router from '/@/router';
import HoverMessageBox from '/@/view/message/components/HoverMessageBox.vue';

export default {
  components: { HoverMessageBox },
  data() {
    return {
      userName: '',
      userAvatar: '',
    };
  },
  setup() {
    const input2 = ref('');
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
      router.push(key);
    };
    const unreadCount = ref(0);
    const handleUnreadCount = (count) => {
      unreadCount.value = count;
    };
    return {
      input2,
      unreadCount,
      handleSelect,
      useUserStore,
      handleUnreadCount,
    };
  },
  computed: {
    Search() {
      return Search;
    },
  },
  methods: {
    goBack() {
      console.log(router.currentRoute);
      this.$router.go(-1);
    },
    async fetchData() {
      try {
        this.userName = useUserStore().name;
        this.userAvatar = useUserStore().avatar;
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
.redDot {
  margin-left: 2px;
  color: white;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: red;
  text-align: center;
  vertical-align: center;
  font-size: small;
}

/*.active-message {*/
/*  --el-menu-hover-bg-color: none;*/
/*  --el-menu-active-color: none;*/
/*  !*pointer-events: none;*!*/
/*}*/
</style>
