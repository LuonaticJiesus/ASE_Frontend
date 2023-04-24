<template>
  <div class="user-info-div">
    <el-row type="flex">
      <el-col>
        <el-row justify="center">
          <el-image
            style="
              border-radius: 50%;
              width: 70px;
              height: 70px;
              border: 4px solid white;
              outline: 1px solid gray;
            "
            :src="logo"
            :fit="'scale-down'"
            lazy
          >
          </el-image>
        </el-row>
        <el-row justify="center" style="margin-top: 5px"> User Name </el-row>
        <el-divider style="margin-top: 10px; margin-bottom: 10px"></el-divider>
        <el-row>
          <el-col :span="12">
            <el-row justify="center" style="font-size: small"> 4 </el-row>
            <el-row
              type="flex"
              justify="center"
              style="font-size: smaller; color: gainsboro"
            >
              订阅模块
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row justify="center" style="font-size: small"> 1 </el-row>
            <el-row
              type="flex"
              justify="center"
              style="font-size: smaller; color: gainsboro"
            >
              发布内容
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  setup() {
    const logo = '/src/assets/logo.png';
    return {
      logo,
    };
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
  padding: 20px 20px 36px 20px;
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
