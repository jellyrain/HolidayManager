<script setup lang="ts">
const props = defineProps<{
  data: {
    personnel: string
    holiday: string
    overTime: string
    startTime: string
    endTime: string
    number: number
    logTime: string
    description: string
  }[]
}>()

const pagination = {
  pageSize: 9,
  current: 1,
  total: 3
}

const columns = [
  {
    title: '人员',
    key: 'personnel'
  },
  {
    title: '假期',
    key: 'holiday'
  },
  {
    title: '加班',
    key: 'leaveTime'
  },
  {
    title: '开始时间',
    key: 'startTime'
  },
  {
    title: '结束时间',
    key: 'endTime'
  },
  {
    title: '加班小时',
    key: 'number'
  },
  {
    title: '记录日期',
    key: 'logTime'
  },
  {
    title: '备注',
    key: 'description'
  }
]
</script>

<template>
  <div>
    <n-data-table
      :columns="columns"
      :data="props.data"
      :pagination="pagination"
      :bordered="false"
    />
  </div>
</template>

<style scoped></style>
