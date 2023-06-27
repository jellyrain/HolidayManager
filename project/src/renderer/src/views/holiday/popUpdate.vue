<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { holiday } from '../../utils/dbType'
import { useStore } from '../../store/index'

const { holidayUpdate } = window.api as {
  holidayUpdate: (data: holiday) => void
}

const props = defineProps<{
  falseModal: () => void
  model: holiday
}>()

// 获取 store
const store = useStore()

const model = reactive<holiday>({
  ...props.model,
  startTime: parseFloat(props.model.startTime as string)
})

const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '假期名称是必填的'
  },
  startTime: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '开始时间是必填的'
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

const resetOptions = [
  {
    label: '不重置',
    value: 0
  },
  {
    label: '重置',
    value: 1
  }
]

// 修改数据
const handleUpdate = () => {
  holidayUpdate(toRaw(model))
  store.updateHoliday(model)
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
    <n-form-item label="假期 Id" path="name">
      <n-input v-model:value="model.id" disabled="false" />
    </n-form-item>
    <n-form-item label="假期名称" path="name">
      <n-input v-model:value="model.name" placeholder="请输入 假期名称" />
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
    <n-form-item label="是否重置" path="reset">
      <n-select
        v-model:value="model.reset"
        placeholder="Select"
        :options="resetOptions"
        disabled="false"
      />
    </n-form-item>
    <n-form-item label="开始时间" path="startTime">
      <n-date-picker v-model:value="model.startTime" type="date" disabled="false" />
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
