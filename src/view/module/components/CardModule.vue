<template>
  <el-card class="box-card" shawdow="always" :body-style="{ margin: '0px' }">
    <template #header>
      <div class="card-header">
        <el-col>
          <el-row type="flex" justify="center">
            <div class="card-avator">
              <el-image
                style="
                  border-radius: 50%;
                  width: 75px;
                  height: 75px;
                  border: double 5px white;
                "
                :src="moduleAvatar"
                :fit="'scale-down'"
                lazy
              >
              </el-image>
            </div>
          </el-row>
        </el-col>
      </div>
    </template>
    <div class="card-body">
      <h2>{{ moduleName }}</h2>
      <div>{{ memberNumber }}人</div>
      <el-button
        style="margin: 20px; border: double 5px white"
        size="large"
        round
        color="blueviolet"
        @click="enterModule"
      >
        进入版块
      </el-button>
    </div>
  </el-card>
</template>

<script>
import router from '/@/router/index.js';
import { defaultLogo } from '/@/utils/string.ts';

export default {
  name: 'CardModule',
  props: {
    moduleId: {
      type: Number,
      default: 0,
    },
    moduleName: {
      type: String,
      default: '版块名称',
    },
    moduleAvatar: {
      type: String,
      default: defaultLogo,
    },
    memberNumber: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    enterModule() {
      // console.log('jump to ', '/module/' + this.moduleId);
      router.push('/module/' + this.moduleId + '/share');
    },
  },
};
</script>

<style scoped>
.el-card :deep(.el-card__header) {
  padding: 0;
  margin: 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  height: 20px;
  background-color: silver;
  border-radius: 12px;
  vertical-align: middle;
  text-align: center;
}
.card-body {
  margin-top: 20px;
}
.card-header .card-avator {
  position: relative;
  padding-top: 50px;
}
.text {
  font-size: 7px;
}
.item {
  margin-bottom: 9px;
}
.box-card {
  width: 240px;
  height: 300px;
  margin: 20px;
  border-radius: 12px;
}
</style>
