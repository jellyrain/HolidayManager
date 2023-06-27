<script setup lang="ts">
import { toRaw } from 'vue'
import { personnel } from '../../utils/dbType'
import { useStore } from '../../store/index'

const { personnelUpdate } = window.api as {
  personnelUpdate: (data: personnel) => void
}

const props = defineProps<{
  falseModal: () => void
  model: personnel
}>()

// 获取 store
const store = useStore()

const model = props.model

const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '人员名称是必填的'
  }
}

const statusOptions = [
  {
    label: '禁用',
    value: 0
  },
  {
    label: '启用',
    value: 1
  }
]

// 修改数据
const handleUpdate = () => {
  personnelUpdate(toRaw(model))
  store.updatePersonnel(model)
  props.falseModal()
}
</script>

<template>
  <n-form
    style="padding: 10px 40px"
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    size="medium"
  >
    <n-form-item label="人员 Id" path="name">
      <n-input v-model:value="model.id" disabled="false" />
    </n-form-item>
    <n-form-item label="人员名称" path="name">
      <n-input v-model:value="model.name" placeholder="请输入 人员名称" />
    </n-form-item>
    <n-form-item label="当前状态" path="status">
      <n-select v-model:value="model.status" placeholder="Select" :options="statusOptions" />
    </n-form-item>
  </n-form>
  <n-button strong secondary type="primary" class="btn" @click="handleUpdate"> 修改 </n-button>
</template>

<style scoped>
.btn {
  margin-left: 470px;
}
</style>
