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

const data = computed(() => {
  return store.gegetCockpitDatas.filter((item) => {
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
    <Table
      :data="data"
      :columns="store.getCockpitColumns"
      :func="{ rechargeAdd, consumptionAdd, configAdd }"
    />
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
