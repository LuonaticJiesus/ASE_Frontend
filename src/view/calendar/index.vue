<!--suppress TypeScriptUnresolvedReference, CssUnusedSymbol -->
<template>
  <DivideContainer class="calendar-view">
    <template #main>
      <div class="calendar-div">
        <el-calendar v-model:model-value="selectedDate">
          <template #date-cell="{ data }">
            <div class="calendar-day">
              <div class="ddl-control-div">
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
              </div>
              <div v-if="isDDL(data.day)" class="notice-tag-list">
                <el-tag
                  v-for="notice of dateMap[
                    dateList.indexOf(new Date(data.day).toDateString())
                  ].notices.slice(0, 2)"
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
      <div class="ddl-card-group">
        <el-row>
          <el-col v-if="!isDDL(selectedDate)" :span="24">
            <el-empty
              style="padding: 0"
              description="当天暂无DDL"
              :image-size="100"
            ></el-empty>
          </el-col>
          <el-scrollbar v-else>
            <div style="display: flex; flex-direction: row; flex-wrap: nowrap">
              <el-card
                shadow="never"
                class="ddl-card"
                v-for="notice of dateMap[
                  dateList.indexOf(selectedDate.toDateString())
                ].notices"
                :key="notice.notice_id"
                :type="notice.confirm_state === 1 ? 'primary' : 'danger'"
              >
                <template #header>
                  <div
                    style="
                      padding: 10px;
                      display: flex;
                      justify-content: space-between;
                    "
                  >
                    <el-text
                      style="font-weight: bold; font-size: large"
                      truncated
                    >
                      {{ notice.title }}
                    </el-text>
                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 70px;
                      "
                    >
                      <el-text style="font-size: small">
                        {{ notice.block_name }}
                      </el-text>
                      <el-text style="font-size: x-small">
                        {{ new Date(notice.time).toLocaleTimeString() }}
                      </el-text>
                    </div>
                  </div>
                </template>
                <template #default>
                  <div style="padding: 10px">
                    <el-scrollbar>
                      <div style="text-align: start; height: 90px">
                        <el-text style="text-align: start">{{
                          strippedHtml(notice.txt)
                        }}</el-text>
                      </div>
                    </el-scrollbar>
                  </div>
                  <el-divider style="margin: 0; padding: 0"></el-divider>
                  <div>
                    <el-button
                      @click="jump(notice.notice_id)"
                      text
                      style="width: 200px"
                      type="primary"
                      >查看</el-button
                    >
                  </div>
                </template>
              </el-card>
            </div>
          </el-scrollbar>
        </el-row>
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
import router from '/@/router';

const selectedDate = ref();
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

const jump = (notice_id) => {
  router.push('/notice/' + notice_id);
};
</script>
<script lang="ts">
export default {
  name: 'CalendarView',
};
</script>

<style>
.calendar-view {
  max-height: 88vh;
}
.el-card__header {
  padding: 0;
}
.el-card__body {
  padding: 0;
}
.ddl-card-group {
  margin: 5px;
  height: auto;
}
.ddl-card {
  width: 180px;
  height: 200px;
  margin-right: 12px;
  border-radius: 12px;
  background-image: linear-gradient(160deg, #faf4ff 0%, #fdfbff 80%);
}
.calendar-div {
  margin: 5vh;
  border-radius: 12px;
  border: solid 1px #e7e7e7;
  background-image: url('/src/assets/0Zd_OaUeF.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top right;
}
.el-calendar__header {
  max-height: 6vh;
  padding: 1.5vh 2.5vh;
}
.el-calendar__body {
  /* max-height: 40vh; */
  padding: 1vh 1.5vw 2.4vh;
}
.el-calendar__body .el-calendar-table {
  max-height: 40vh;
}
.el-calendar-table thead {
  max-height: 2vh;
}
.el-calendar-table thead th {
  max-height: 4vh;
  font-size: 2vh;
  padding: 2vh 0;
}
.calendar-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.ddl-control-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
.el-calendar-table__row .is-selected .calendar-day {
  background-color: var(--el-color-primary-light-9);
}
.el-calendar-table .el-calendar-day {
  padding: 0;
  max-height: var(--el-calendar-cell-width);
}
.el-calendar-table .el-calendar-day:hover {
  background-color: var(--el-color-primary-light-10);
  opacity: 70%;
}

.el-calendar {
  --el-calendar-cell-width: 6vh;
  background-color: rgba(255, 255, 255, 0);
}

.notice-tag-list,
.calendar-day:hover .is-unconfirmed-ddl,
.calendar-day:hover .is-confirmed-ddl,
.calendar-day:hover .red-dot,
.calendar-day:hover .primary-dot,
.el-calendar-table__row .is-selected .calendar-day .is-unconfirmed-ddl,
.el-calendar-table__row .is-selected .calendar-day .is-confirmed-ddl,
.el-calendar-table__row .is-selected .calendar-day .red-dot,
.el-calendar-table__row .is-selected .calendar-day .primary-dot {
  display: none;
}

.calendar-day:hover .notice-tag-list,
.el-calendar-table__row .is-selected .calendar-day .notice-tag-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 50px;
}

/*.el-calendar::before {*/
/*  content: '';*/
/*  background-image: url('/src/assets/0Zd_OaUeF.png');*/
/*  background-repeat: no-repeat;*/
/*  background-size: cover;*/
/*  background-position: right;*/
/*  z-index: -1; !*设置该标签等级，让其始终位于最上层*!*/
/*  -webkit-filter: opacity(70%); !*设置透明度   blur还可以改变照片的模糊度*!*/
/*  filter: opacity(70%);*/
/*}*/

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
