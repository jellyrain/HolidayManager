<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { useNotification } from 'naive-ui'
import { uuidv4 } from '../../utils/utils'
import { overTime } from '../../utils/dbType'
import { useStore } from '../../store/index'

const { overTimeAdd } = window.api as {
  overTimeAdd: (data: overTime) => void
}

const props = defineProps<{
  falseModal: () => void
}>()

// 弹窗
const notification = useNotification()

// 获取 store
const store = useStore()

const model = reactive<overTime>({
  id: uuidv4(),
  name: '',
  unit: 'h',
  status: 1,
  defaultNumber: 1,
  description: ''
})

const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '加班名称是必填的'
  },
  defaultNumber: {
    type: 'number',
    required: true,
    trigger: ['blur', 'input'],
    message: '加班计数必须是数字'
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

// 添加数据
const handleAdd = () => {
  if (model.name === '') {
    notification.warning({
      content: '提示',
      meta: '加班名称是必填的',
      duration: 2000,
      keepAliveOnHover: true
    })
    return
  }

  if (model.defaultNumber == null) {
    notification.warning({
      content: '提示',
      meta: '加班计数必须是数字',
      duration: 2000,
      keepAliveOnHover: true
    })
    return
  }
  overTimeAdd(toRaw(model))
  store.overTime.push(model)
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
    <n-form-item label="加班名称" path="name">
      <n-input v-model:value="model.name" placeholder="请输入 加班名称" />
    </n-form-item>
    <n-form-item label="计算单位" path="unit">
      <n-select v-model:value="model.unit" placeholder="Select" :options="unitOptions" />
    </n-form-item>
    <n-form-item label="当前状态" path="status">
      <n-select v-model:value="model.status" placeholder="Select" :options="statusOptions" />
    </n-form-item>
    <n-form-item label="加班计数" path="defaultNumber">
      <n-input-number v-model:value="model.defaultNumber" />
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
  <n-button strong secondary type="primary" class="btn" @click="handleAdd"> 添加 </n-button>
</template>

<style scoped>
.btn {
  margin-left: 470px;
}
</style>
