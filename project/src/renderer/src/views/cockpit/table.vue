<script setup lang="ts">
import { NButton } from 'naive-ui'
import { h } from 'vue'

const props = defineProps<{
  data: Object[]
  columns: Object[]
  func: {
    rechargeAdd: (id: string) => void
    consumptionAdd: (id: string) => void
    configAdd: (id: string) => void
  }
}>()

const pagination = {
  pageSize: 9,
  current: 1,
  total: 3
}

const columns = [
  {
    title: '人员名称',
    key: 'name'
  },
  ...props.columns,
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return [
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            type: 'info',
            size: 'small',
            style: {
              marginRight: '12px'
            },
            onClick: () => props.func.rechargeAdd(row.id)
          },
          { default: () => '充值' }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            type: 'error',
            size: 'small',
            style: {
              marginRight: '12px'
            },
            onClick: () => props.func.consumptionAdd(row.id)
          },
          { default: () => '消费' }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            type: 'primary',
            size: 'small',
            onClick: () => props.func.configAdd(row.id)
          },
          { default: () => '配置' }
        )
      ]
    }
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
