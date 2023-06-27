<script setup lang="ts">
import { NTag, NButton } from 'naive-ui'
import { h, toRaw } from 'vue'
import dayjs from 'dayjs'
import { holiday } from '../../utils/dbType'
import { useStore } from '../../store/index'

const props = defineProps<{
  data: Array<holiday>
  func: {
    updateTrueModal: (data: holiday) => void
  }
}>()

const { holidayDelete } = window.api as {
  holidayDelete: (id: string) => void
}

const store = useStore()

const pagination = {
  pageSize: 9,
  current: 1,
  total: 3
}

function handleDelete(row) {
  holidayDelete(row.id)
  store.deleteHoliday(row.id)
}

const columns = [
  {
    title: '假期名称',
    key: 'name'
  },
  {
    title: '计算单位',
    key: 'unit',
    render(row) {
      return row.unit == 'h' ? '小时' : '天'
    }
  },
  {
    title: '当前状态',
    key: 'status',
    render(row) {
      const status = row.status
      return h(
        NTag,
        {
          style: {
            marginRight: '6px'
          },
          type: status == 1 ? 'primary' : 'error',
          bordered: false
        },
        {
          default: () => (status == 1 ? '启用' : '禁用')
        }
      )
    },
    sorter(rowA, rowB) {
      return rowA.status - rowB.status
    }
  },
  {
    title: '是否重置',
    key: 'reset',
    render(row) {
      const reset = row.reset
      return h(
        NTag,
        {
          style: {
            marginRight: '6px'
          },
          type: reset == 1 ? 'info' : 'warning',
          bordered: false
        },
        {
          default: () => (reset == 1 ? '重置' : '不重置')
        }
      )
    },
    sorter(rowA, rowB) {
      return rowA.reset - rowB.reset
    }
  },
  {
    title: '开始时间',
    key: 'startTime',
    render(row) {
      return dayjs(parseFloat(row.startTime)).format('YYYY-MM-DD')
    },
    sorter(rowA, rowB) {
      return rowA.startTime - rowB.startTime
    }
  },
  {
    title: '备注',
    key: 'description'
  },
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
            onClick: () => props.func.updateTrueModal(toRaw(row))
          },
          { default: () => '修改' }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            type: 'error',
            size: 'small',
            onClick: () => handleDelete(row)
          },
          { default: () => '删除' }
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
