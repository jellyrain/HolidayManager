<script setup lang="ts">
import { computed, ref } from 'vue'
import { overTimeLog } from '../../utils/dbType'
import { SearchOutlined } from '@vicons/antd'
import { useStore } from '../../store/index'
import dayjs from 'dayjs'
import Table from './table.vue'

const { overTimeLogSelect } = window.api as {
  overTimeLogSelect: () => Promise<overTimeLog[]>
}

// 筛选框
const selectName = ref('')
// 获取状态
const store = useStore()

let datas = ref<
  {
    personnel: string
    holiday: string
    overTime: string
    startTime: string
    endTime: string
    number: number
    logTime: string
    description: string
  }[]
>([])

// 获取数据
overTimeLogSelect().then((res) => {
  res.forEach((item) => {
    const temp: any = {}
    temp.personnel = store.getPersonnel.filter((i) => i.id === item.personnelId)[0].name
    temp.holiday = store.getHoliday.filter((i) => i.id === item.holidayId)[0].name
    temp.leaveTime = store.getOverTime.filter((i) => i.id === item.overTimeId)[0].name
    temp.startTime = dayjs(parseFloat(item.startTime as string)).format('YYYY-MM-DD HH:mm:ss')
    temp.endTime = dayjs(parseFloat(item.endTime as string)).format('YYYY-MM-DD HH:mm:ss')
    temp.number = item.number
    temp.logTime = item.logTime
    temp.description = item.description
    datas.value.push(temp)
  })
})

const data = computed(() => {
  return datas.value.filter((item) => {
    return item.personnel.includes(selectName.value)
  })
})
</script>

<template>
  <div class="container">
    <div class="command">
      <n-input placeholder="请输入人员名称" v-model:value="selectName" style="width: 40%">
        <template #prefix>
          <n-icon :component="SearchOutlined" />
        </template>
      </n-input>
    </div>
    <Table :data="data" />
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.command {
  display: flex;
  justify-content: space-between;
  padding: 15px 0 30px 0;
}
</style>
