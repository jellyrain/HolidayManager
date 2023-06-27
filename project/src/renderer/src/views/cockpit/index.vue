<script setup lang="ts">
import { computed, ref } from 'vue'
import { SearchOutlined } from '@vicons/antd'
import { useStore } from '../../store/index'
import Table from './table.vue'
import Recharge from './recharge.vue'
import Consumption from './consumption.vue'
import Config from './config.vue'

// 筛选框
const selectName = ref('')
// 获取状态
const store = useStore()

// 配置表格（显示假期）
const columns = computed(() => {
  return store.holiday
    .filter((item) => {
      return item.status == 1
    })
    .map((item) => {
      return {
        title: item.name + '(天)',
        key: item.id,
        render(row) {
          return row[item.id] == null ? '未配置' : row[item.id]
        }
      }
    })
})

// 使用计算属性 计算表格数据
const datas = computed(() => {
  const result: any = []

  const holidayObject = {}
  store.holiday
    .filter((item) => {
      return item.status == 1
    })
    .forEach((holiday) => {
      holidayObject[holiday.id] = null
    })
  store.personnel
    .filter((item) => {
      return item.status == 1
    })
    .forEach((personnel) => {
      const data = {
        id: personnel.id,
        name: personnel.name,
        ...holidayObject
      }
      store.scheduling
        .filter((scheduling) => scheduling.personnelId == personnel.id)
        .forEach((item) => {
          data[item.holidayId] = item.vacationTime
        })
      result.push(data)
    })

  return result
})

const data = computed(() => {
  return datas.value.filter((item) => {
    return item.name.includes(selectName.value)
  })
})

// 弹窗
const rechargeShowModal = ref(false)
const consumptionShowModal = ref(false)
const configShowModal = ref(false)

const personnelId = ref('')

const rechargeAdd = (id: string) => {
  personnelId.value = id
  rechargeShowModal.value = true
}

const consumptionAdd = (id: string) => {
  personnelId.value = id
  consumptionShowModal.value = true
}

const configAdd = (id: string) => {
  personnelId.value = id
  configShowModal.value = true
}

const falseModal = () => {
  rechargeShowModal.value = false
  consumptionShowModal.value = false
  configShowModal.value = false
}
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
    <Table :data="data" :columns="columns" :func="{ rechargeAdd, consumptionAdd, configAdd }" />
    <n-modal
      v-model:show="rechargeShowModal"
      preset="card"
      style="width: 600px; padding: 10px"
      title="充值"
      :bordered="false"
    >
      <Recharge :falseModal="falseModal" :personnelId="personnelId" />
    </n-modal>
    <n-modal
      v-model:show="consumptionShowModal"
      preset="card"
      style="width: 600px; padding: 10px"
      title="消费"
      :bordered="false"
    >
      <Consumption :falseModal="falseModal" :personnelId="personnelId" />
    </n-modal>
    <n-modal
      v-model:show="configShowModal"
      preset="card"
      style="width: 600px; padding: 10px"
      title="配置"
      :bordered="false"
    >
      <Config :falseModal="falseModal" :personnelId="personnelId" />
    </n-modal>
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
