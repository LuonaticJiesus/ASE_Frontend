<template>
  <el-card class="box-card" shawdow="always" :body-style="{ margin: '0px' }">
    <template #header>
      <div class="card-header">
        <el-col>
          <el-row type="flex" justify="center">
            <div class="card-avator">
              <el-image
                style="border-radius: 50%; width: 65px; height: 65px"
                :src="moduleAvator"
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
        style="margin: 2vh"
        size="large"
        round
        color="#626aef"
        @click="enterModule"
      >
        进入版块
      </el-button>
    </div>
  </el-card>
</template>

<script>
import router from '/@/router/index.js';

export default {
  name: 'CardModule',
  setup() {
    const logo = '/src/assets/logo.png';
    return {
      logo,
    };
  },
  props: {
    moduleId: {
      type: Number,
      default: 0,
    },
    moduleName: {
      type: String,
      default: '版块名称',
    },
    moduleAvator: {
      type: String,
      default: '',
    },
    memberNumber: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    enterModule() {
      console.log('jump to ', '/module/' + this.moduleId);
      router.push('/module/' + this.moduleId);
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
  padding: 15px;
  height: 5vh;
  background-color: silver;
  border-radius: 12px;
  vertical-align: middle;
  text-align: center;
}
.card-body {
  margin-top: 2vh;
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
  width: 30vh;
  height: 40vh;
  margin: 4vh;
  border-radius: 12px;
}
</style>
