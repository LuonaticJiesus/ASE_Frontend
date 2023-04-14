<template>
  <div style="padding: 0">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="fig" label="" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="comment" label="评论" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="time" label="更新时间" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ShareView',
  components: {},
  data: () => {
    return {
      tableData: [
        {
          fig: '/src/assets/logo.png',
          title: 'title',
          comment: 0,
          author: 'author',
          time: 'time',
        },
      ],
    };
  },
  methods: {
    fetchData: () => {
      console.log('fetchData');
    },
  },
};
</script>

<style scoped>
.module-header {
  background-color: silver;
  height: 30vh;
  padding: 0;
}
.module-pannel {
  display: flex;
  background-color: white;
  height: 30vh;
  margin-top: 130px;
  margin-bottom: 0;
}
</style>
