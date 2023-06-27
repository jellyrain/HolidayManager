<script setup lang="ts">
import { computed, ref } from 'vue'
import { SearchOutlined } from '@vicons/antd'
import { useStore } from '../../store/index'
import Table from './table.vue'
import PopInesrt from './popInesrt.vue'
import PopUpdate from './popUpdate.vue'
import { holiday } from '../../utils/dbType'

// 筛选框
const selectName = ref('')
// 获取状态
const store = useStore()
// 当前操作对象
const model = ref<holiday>({
  id: '',
  name: '',
  unit: 'h',
  status: 1,
  startTime: '',
  reset: 0,
  description: ''
})

const data = computed(() => {
  return store.holiday.filter((item) => {
    return item.name.includes(selectName.value)
  })
})

// 弹窗
const insertShowModal = ref(false)
const updateShowModal = ref(false)

const insertTrueModal = () => {
  insertShowModal.value = true
}

const updateTrueModal = (data: holiday) => {
  model.value = data
  updateShowModal.value = true
}

const falseModal = () => {
  insertShowModal.value = false
  updateShowModal.value = false
}
</script>

<template>
  <div class="container">
    <div class="command">
      <n-input placeholder="请输入假期名称" v-model:value="selectName" style="width: 40%">
        <template #prefix>
          <n-icon :component="SearchOutlined" />
        </template>
      </n-input>
      <n-button strong secondary type="primary" @click="insertTrueModal"> 添加 </n-button>
    </div>
    <Table :data="data" :func="{ updateTrueModal }" />
    <n-modal
      v-model:show="insertShowModal"
      preset="card"
      style="width: 600px; padding: 10px"
      title="添加假期"
      :bordered="false"
    >
      <PopInesrt :falseModal="falseModal" />
    </n-modal>
    <n-modal
      v-model:show="updateShowModal"
      preset="card"
      style="width: 600px; padding: 10px"
      title="修改假期"
      :bordered="false"
    >
      <PopUpdate :falseModal="falseModal" :model="model" />
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
