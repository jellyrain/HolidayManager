<script setup lang="ts">
const props = defineProps<{
  data: {
    personnel: string
    holiday: string
    leaveTime: string
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
    title: '休假',
    key: 'leaveTime'
  },
  {
    title: '休假小时',
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
