<template>
  <div class="head-bar-div">
    <el-menu
      :default-active="activeIndex"
      style="height: 100%; width: 100%; background-color: #312f31; border: none"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <div class="image-container">
        <ChatDotRound
          style="
            width: 100%; /* 将图像设置为容器的宽度 */
            height: 100%; /* 将图像设置为容器的高度 */
            color: #9007ff;
            border: #9007ff solid 5px;
            border-radius: 15%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          "
        />
      </div>
      <span class="title">QuadSSSS</span>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ChatDotRound } from '@element-plus/icons-vue';
const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<script lang="ts"></script>

<style scoped>
.head-bar-div {
  height: 100%;
  margin: 0;
  align-items: center;
}

.image-container {
  display: inline-block; /* 将容器设置为行内块，以便可以在其中包含图像 */
  padding: 0; /* 取消容器的内边距 */
  box-sizing: border-box; /* 设置盒模型为border-box，以便边框宽度不会增加元素的宽度 */
  width: 50px; /* 设置容器宽度 */
  height: 50px; /* 设置容器高度 */
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 100px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 180px;
  font-size: 28px;
  font-family: Cambria, serif;
  font-weight: bold;
  color: white;
}

.custom-input :deep(.el-input__wrapper) {
  background-color: #f9f3f9;
}
</style>
