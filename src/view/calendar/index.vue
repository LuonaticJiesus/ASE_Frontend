<!--suppress TypeScriptUnresolvedReference -->
<template>
  <DivideContainer>
    <template #main>
      <div class="calendar-div">
        <el-calendar>
          <template #date-cell="{ data }">
            <div class="calendar-day">
              <h4
                :class="
                  isDDL(data.day)
                    ? 'is-unconfirmed-ddl'
                    : isToday(data.day)
                    ? 'is-today'
                    : 'is-normal'
                "
                style="padding: 0; margin: 0"
              >
                {{ data.day.split('-').slice(2).join('-') }}
              </h4>
              <div :class="isDDL(data.day) ? 'red-dot' : 'none-dot'"></div>
              <div
                v-if="isDDL(data.day)"
                class="notice-tag-list"
                v-show="false"
              >
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
            </div>
          </template>
        </el-calendar>
      </div>
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
import 'element-plus/theme-chalk/el-calendar.css';

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
.calendar-div {
}
.el-calendar__body .el-calendar-table {
  background-image: url('/src/assets/0Zd_OaUeF.png');
}
.calendar-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
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
.is-unconfirmed-ddl {
  color: var(--el-color-danger);
  margin: 0;
}
.is-confirmed-ddl {
  color: var(--el-color-warning);
  margin: 0;
}
.is-today {
  color: var(--el-color-primary-light-3);
  margin: 0;
}
.is-normal {
  margin: 0;
}
.el-calendar-table__row .current .calendar-day {
  text-align: center;
  color: #202535;
  line-height: 100%;
  /*  这里的height设为--el-calendar-cell-width的值，可以在【返回】操作时保证样式不乱*/
  /*  浏览器博大精深啊！=_=*/
  height: var(--el-calendar-cell-width);
  font-size: 16px;
  font-weight: 700;
}
.el-calendar-table__row .prev .calendar-day,
.el-calendar-table__row .next .calendar-day {
  text-align: center;
  /* color: #202535; */
  line-height: 100%;
  height: var(--el-calendar-cell-width);
  font-size: 14px;
  font-weight: 700;
}
.el-calendar-table__row .current .el-calendar-day {
}
.el-calendar {
  --el-calendar-cell-width: 60px;
  background-image: url('/src/assets/0Zd_OaUeF.png');
  /*background-repeat: no-repeat;*/
  background-size: cover;
  background-position: right;
}

.el-calendar__title {
  font-size: smaller;
}

.red-dot {
  margin-top: 4px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: red;
  text-align: center;
  vertical-align: center;
  font-size: small;
}

.primary-dot {
  margin-top: 4px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #9007ff;
  text-align: center;
  vertical-align: center;
  font-size: small;
}

.none-dot {
  display: none;
}
</style>
