<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui'
import MenuBar from './components/MenuBar.vue'
import Anchor from './components/anchor/Anchor.vue'
import { holiday, holidayLog, leaveTime, overTime, personnel, scheduling } from './utils/dbType'
import { useStore } from './store'
import { toRaw } from 'vue'

// 引入 api
const {
  holidaySelect,
  leaveTimeSelect,
  overTimeSelect,
  personnelSelect,
  schedulingSelect,
  schedulingUpdate,
  holidayUpdate,
  holidayLogNewData
} = window.api as {
  holidaySelect: () => Promise<holiday[]>
  leaveTimeSelect: () => Promise<leaveTime[]>
  overTimeSelect: () => Promise<overTime[]>
  personnelSelect: () => Promise<personnel[]>
  schedulingSelect: () => Promise<scheduling[]>
  schedulingUpdate: (data: scheduling) => void
  holidayUpdate: (data: holiday) => void
  holidayLogNewData: (personnelId: string, holidayId: string) => Promise<holidayLog>
}

// 初始化数据
const store = useStore()

const init = async () => {
  store.setHoliday(await holidaySelect())
  store.setLeaveTime(await leaveTimeSelect())
  store.setOverTime(await overTimeSelect())
  store.setPersonnel(await personnelSelect())
  store.setScheduling(await schedulingSelect())

  store.getHoliday
    .filter((item) => {
      const now = new Date()
      const resetTime = new Date(parseFloat(item.resetTime as string))
      const startTime = new Date(parseFloat(item.startTime as string))
      const nowYear = new Date(now.getFullYear(), startTime.getMonth(), startTime.getDate())
      return item.reset == 1 && resetTime < nowYear
    })
    .forEach((holiday) => {
      store.getScheduling
        .filter((scheduling) => {
          return scheduling.holidayId == holiday.id
        })
        .forEach((scheduling) => {
          holidayLogNewData(scheduling.personnelId, scheduling.holidayId).then((item) => {
            scheduling.vacationTime = item[0].number
            schedulingUpdate(toRaw(scheduling))
          })
        })
      holidayUpdate({
        ...holiday,
        resetTime: Date.now()
      })
    })
}

init()

setTimeout(() => {
  schedulingSelect().then((res) => {
    store.setScheduling(res)
  })
}, 500)
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-notification-provider>
      <div class="container">
        <MenuBar />
        <div class="main">
          <Anchor />
          <router-view class="content"></router-view>
        </div>
      </div>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}
.main {
  width: 100vw;
  height: 680px;
  display: flex;
}

.content {
  width: 950px;
  height: 100%;
}
</style>
