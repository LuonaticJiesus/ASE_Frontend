<!--suppress TypeScriptUnresolvedReference -->
<template>
  <DivideContainer>
    <template #main>
      <el-calendar>
        <template #date-cell="{ data }">
          <div class="calendar-day">
            <h4
              :class="
                isDDL(data.day)
                  ? 'is-ddl'
                  : isToday(data.day)
                  ? 'is-today'
                  : 'is-normal'
              "
            >
              {{ data.day.split('-').slice(2).join('-') }}
            </h4>
          </div>
          <div v-if="isDDL(data.day)" class="notice-tag-list">
            <el-tag
              v-for="notice of dateMap[
                dateList.indexOf(new Date(data.day).toDateString())
              ].notices"
              :key="notice.notice_id"
              :type="notice.confirm_state === 1 ? 'primary' : 'danger'"
              class="notice-tag"
              disable-transitions
            >
              {{ strippedHtml(notice.title) }}
            </el-tag>
          </div>
        </template>
      </el-calendar>
    </template>
    <template #right>
      <RightBoard />
    </template>
  </DivideContainer>
</template>

<script setup lang="ts">
import DivideContainer from '/@/layout/components/DivideContainer.vue';
import RightBoard from '/@/components/RightBoard.vue';
import { onMounted, Ref, ref } from 'vue';
import { noticeType } from '/@/utils/type';
import { getNoticeList } from '/@/api/notice';
import { useUserStore } from '/@/store';
import { getLocalUserId, getToken } from '/@/utils/auth';
import { strippedHtml } from '/@/utils/string';

const todoList: Ref<noticeType[]> = ref([]);
interface dateMapType {
  date: string;
  notices: noticeType[];
}
const dateMap: Ref<dateMapType[]> = ref([]);
/*
 dateMap=[
  {date:'2023-05-01', notices:[notice1, notice2, ...]},
  {date:'2023-04-29', notices:[notice1, notice2, ...]}
 ]
 */
const dateList: Ref<string[]> = ref([]);

onMounted(async () => {
  const data = {
    user_id: useUserStore().user_id,
  };
  const headers = {
    token: getToken(),
    userid: getLocalUserId(),
  };
  const result = await getNoticeList(headers, {
    ...data,
    confirm_op: 0,
    undue_op: 1,
  });
  console.log(result);
  if (result && result.length > 0) {
    todoList.value = result;
    let indexDate = '1969-01-01';
    let index = -1;
    todoList.value.sort((a, b) => Date.parse(a.ddl) - Date.parse(b.ddl));
    for (let item of todoList.value) {
      let date = new Date(item.ddl).toDateString();
      if (date === indexDate) {
        dateMap.value[index].notices.push(item);
      } else {
        index += 1;
        dateMap.value.push({ date: date, notices: [] });
        dateMap.value[index].notices.push(item);
        dateList.value.push(date);
        indexDate = date;
      }
    }
  }
  console.log(dateMap.value);
});

const isDDL = (day) => {
  const date = new Date(day);
  return dateList.value.some((ddlStr) => date.toDateString() === ddlStr);
};

const today = ref(new Date());
const isToday = (day) => {
  const date = new Date(day);
  return date.toDateString() === today.value.toDateString();
};
</script>
<script lang="ts">
export default {
  name: 'CalendarView',
};
</script>

<style scoped>
.notice-tag-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 50px;
}
.notice-tag {
  margin-top: 2px;
  max-width: 80px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}
.is-ddl {
  color: red;
  margin: 0;
}
.is-today {
  margin: 0;
}
.is-normal {
  margin: 0;
}
.el-calendar-table__row .current .calendar-day {
  text-align: center;
  color: #202535;
  line-height: 20px;
  font-size: 14px;
  font-weight: 700;
}
.el-calendar-table__row .prev .calendar-day,
.el-calendar-table__row .next .calendar-day {
  text-align: center;
  /* color: #202535; */
  line-height: 20px;
  font-size: 14px;
  font-weight: 700;
}
.el-calendar-table .el-calendar-day {
  padding: 1px;
  height: auto;
}
.el-calendar__title {
  font-size: smaller;
}
</style>
