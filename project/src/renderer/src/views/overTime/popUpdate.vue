<script setup lang="ts">
import { toRaw } from 'vue'
import { overTime } from '../../utils/dbType'
import { useStore } from '../../store/index'

const { overTimeUpdate } = window.api as {
  overTimeUpdate: (data: overTime) => void
}

const props = defineProps<{
  falseModal: () => void
  model: overTime
}>()

// 获取 store
const store = useStore()

const model = props.model

const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '加班名称是必填的'
  }
}

const unitOptions = [
  {
    label: '小时',
    value: 'h'
  },
  {
    label: '天',
    value: 'd'
  }
]

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
  overTimeUpdate(toRaw(model))
  store.updateOverTime(model)
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
    <n-form-item label="加班 Id" path="name">
      <n-input v-model:value="model.id" disabled="false" />
    </n-form-item>
    <n-form-item label="加班名称" path="name">
      <n-input v-model:value="model.name" placeholder="请输入 加班名称" />
    </n-form-item>
    <n-form-item label="计算单位" path="unit">
      <n-select
        v-model:value="model.unit"
        placeholder="Select"
        :options="unitOptions"
        disabled="false"
      />
    </n-form-item>
    <n-form-item label="当前状态" path="status">
      <n-select v-model:value="model.status" placeholder="Select" :options="statusOptions" />
    </n-form-item>
    <n-form-item label="加班计数" path="defaultNumber">
      <n-input-number v-model:value="model.defaultNumber" disabled="false" />
    </n-form-item>
    <n-form-item label="备注" path="description">
      <n-input
        v-model:value="model.description"
        placeholder="请输入 备注"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </n-form-item>
  </n-form>
  <n-button strong secondary type="primary" class="btn" @click="handleUpdate"> 修改 </n-button>
</template>

<style scoped>
.btn {
  margin-left: 470px;
}
</style>
