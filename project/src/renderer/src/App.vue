<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui'
import MenuBar from './components/MenuBar.vue'
import Anchor from './components/anchor/Anchor.vue'
import { holiday, leaveTime, overTime, personnel, scheduling } from './utils/dbType'
import { useStore } from './store'

// 引入 api
const { holidaySelect, leaveTimeSelect, overTimeSelect, personnelSelect, schedulingSelect } =
  window.api as {
    holidaySelect: () => Promise<holiday[]>
    leaveTimeSelect: () => Promise<leaveTime[]>
    overTimeSelect: () => Promise<overTime[]>
    personnelSelect: () => Promise<personnel[]>
    schedulingSelect: () => Promise<scheduling[]>
  }

// 初始化数据
const store = useStore()

holidaySelect().then((res: holiday[]) => {
  store.holiday = res
})

leaveTimeSelect().then((res: leaveTime[]) => {
  store.leaveTime = res
})

overTimeSelect().then((res: overTime[]) => {
  store.overTime = res
})

personnelSelect().then((res: personnel[]) => {
  store.personnel = res
})

schedulingSelect().then((res: scheduling[]) => {
  store.scheduling = res
})
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
