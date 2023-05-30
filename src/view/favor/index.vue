<template>
  <DivideContainer>
    <template #main>
      <div class="favor-center">
        <h2 style="margin: 0; text-align: start">我的收藏</h2>
        <el-divider style="margin-top: 5px; margin-bottom: 10px"></el-divider>
        <div style="padding: 0">
          <el-table
            :data="tableData"
            class="share-table"
            height="75vh"
            :row-style="{ height: '15vh' }"
            @row-click="jump"
          >
            <el-table-column prop="fig" label="" width="20" />
            <el-table-column prop="title" label="标题" width="140" />
            <el-table-column prop="block_name" label="所属模块" width="100" />
            <el-table-column
              prop="txt"
              label="预览"
              width="200"
              :show-overflow-tooltip="true"
            />
            <el-table-column prop="user_name" label="作者" width="100" />
            <el-table-column prop="like_cnt" label="点赞" width="80" sortable />
            <el-table-column
              prop="comment_cnt"
              label="评论"
              width="80"
              sortable
            />
            <el-table-column
              prop="time"
              label="更新时间"
              width="160"
              sortable
            />
          </el-table>
        </div>
      </div>
    </template>
    <template #right> <RightBoard /> </template>
  </DivideContainer>
</template>

<script>
import RightBoard from '/@/components/RightBoard.vue';
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import { getLocalUserId, getToken } from '/@/utils/auth.ts';
import router from '/@/router/index.js';
import { queryPostFavor } from '/@/api/article.js';
import { strippedHtml } from '/@/utils/string.ts';

export default {
  name: 'PostFavors',
  components: { DivideContainer, RightBoard },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    fetchData() {
      console.log('favor/index.vue fetchData....', this);
      const headers = {
        userid: getLocalUserId(),
        token: getToken(),
      };
      queryPostFavor(headers)
        .then((res) => {
          console.log('favor/index.vue fetchData success: ', res);
          this.tableData = res;
          for (let i of this.tableData) {
            i.txt = strippedHtml(i.txt);
            i.time = new Date(i.time).toLocaleString();
          }
        })
        .catch((err) => {
          console.log('favor/index.vue fetchData fail: ' + err);
        });
    },
    jump(row) {
      router.push('/post/' + row.post_id);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.favor-center {
  padding: 20px;
}
.share-table {
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  &:hover {
    cursor: pointer;
  }
}
.el-table :deep(.el-popper) {
  display: none;
}
</style>
