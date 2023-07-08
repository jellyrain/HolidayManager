<script setup lang="ts">
import { computed, ref } from 'vue'
import { leaveTimeLog } from '../../utils/dbType'
import { SearchOutlined } from '@vicons/antd'
import { useStore } from '../../store/index'
import Table from './table.vue'

const { leaveTimeLogSelect } = window.api as {
  leaveTimeLogSelect: () => Promise<leaveTimeLog[]>
}

// 筛选框
const selectName = ref('')
// 获取状态
const store = useStore()

let datas = ref<
  {
    personnel: string
    holiday: string
    leaveTime: string
    number: number
    logTime: string
    description: string
  }[]
>([])

// 获取数据
leaveTimeLogSelect().then((res) => {
  res.forEach((item) => {
    const temp: any = {}
    temp.personnel = store.getPersonnel.filter((i) => i.id === item.personnelId)[0].name
    temp.holiday = store.getHoliday.filter((i) => i.id === item.holidayId)[0].name
    temp.leaveTime = store.getLeaveTime.filter((i) => i.id === item.leaveTimeId)[0].name
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
