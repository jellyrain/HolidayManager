<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { useNotification } from 'naive-ui'
import dayjs from 'dayjs'
import { uuidv4 } from '../../utils/utils'
import { holiday } from '../../utils/dbType'
import { useStore } from '../../store/index'

const { holidayAdd } = window.api as {
  holidayAdd: (data: holiday) => void
}

const props = defineProps<{
  falseModal: () => void
}>()

// 弹窗
const notification = useNotification()

// 获取 store
const store = useStore()

const model = reactive<holiday>({
  id: uuidv4(),
  name: '',
  unit: 'd',
  status: 1,
  reset: 0,
  startTime: dayjs().valueOf(),
  description: ''
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

// 添加数据
const handleAdd = () => {
  if (model.name === '') {
    notification.warning({
      content: '提示',
      meta: '假期名称是必填的',
      duration: 2000,
      keepAliveOnHover: true
    })
  } else {
    holidayAdd(toRaw(model))
    store.holiday.push(model)
    props.falseModal()
  }
}

notification.info({
  content: '配置提示',
  meta: '假期的 计算单位 暂未使用！',
  duration: 4000,
  keepAliveOnHover: true
})
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
      <n-select v-model:value="model.reset" placeholder="Select" :options="resetOptions" />
    </n-form-item>
    <n-form-item label="开始时间" path="startTime">
      <n-date-picker v-model:value="model.startTime" type="date" />
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
