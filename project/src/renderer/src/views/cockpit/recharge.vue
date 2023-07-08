<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { useNotification } from 'naive-ui'
import { uuidv4 } from '../../utils/utils'
import { scheduling, overTimeLog } from '../../utils/dbType'
import { useStore } from '../../store/index'

const { schedulingUpdate, overTimeLogAdd, schedulingSelect } = window.api as {
  schedulingUpdate: (data: scheduling) => void
  overTimeLogAdd: (data: overTimeLog) => void
  schedulingSelect: () => Promise<scheduling[]>
}

const props = defineProps<{
  falseModal: () => void
  personnelId: string
}>()

// 弹窗
const notification = useNotification()

// 获取 store
const store = useStore()

const model: scheduling & { overTimeId: string; range: [number, number]; description: string } =
  reactive({
    id: uuidv4(),
    personnelId: props.personnelId,
    holidayId: '',
    overTimeId: '',
    range: [Date.now(), Date.now()],
    endTime: '',
    number: 0,
    vacationTime: 0,
    description: ''
  })

// 添加数据
const handleAdd = () => {
  if (model.holidayId == '') {
    notification.warning({
      content: '提示',
      meta: '假期是必选的',
      duration: 2000,
      keepAliveOnHover: true
    })
    return
  }

  if (model.overTimeId == '') {
    notification.warning({
      content: '提示',
      meta: '加班是必选的',
      duration: 2000,
      keepAliveOnHover: true
    })
    return
  }

  // 获取当前 scheduling 是否有数据，如果 不为 null 说明已经设置过了应该覆盖，如果为 null 说明当前选择的假期此人未配置
  const index = store.getScheduling.findIndex((item) => {
    return item.personnelId == model.personnelId && item.holidayId == model.holidayId
  })

  const scheduling = store.getScheduling[index]

  // range[0] 开始时间 range[1] 结束时间, 计算出加班时长，如果计算结果不是整数，向下取整
  const overTimeDate = Math.floor((model.range[1] - model.range[0]) / 1000 / 60 / 60)

  if (scheduling && scheduling.vacationTime != null) {
    scheduling.vacationTime = store.getScheduling[index].vacationTime + overTimeDate
    schedulingUpdate(toRaw(store.scheduling[index]))
    overTimeLogAdd({
      id: uuidv4(),
      personnelId: model.personnelId,
      holidayId: model.holidayId,
      overTimeId: model.overTimeId,
      startTime: model.range[0],
      endTime: model.range[1],
      number: overTimeDate,
      description: model.description
    })

    schedulingSelect().then((res) => {
      store.setScheduling(res)
    })

    props.falseModal()
  } else {
    notification.warning({
      content: '提示',
      meta: '当前选择的假期此人未配置',
      duration: 2000,
      keepAliveOnHover: true
    })
  }
}
</script>

<template>
  <n-form
    style="padding: 10px 40px"
    ref="formRef"
    :model="model"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    size="medium"
  >
    <n-form-item label="假期" path="unit">
      <n-select
        v-model:value="model.holidayId"
        placeholder="Select"
        :options="store.getHolidayObject"
      />
    </n-form-item>
    <n-form-item label="加班时间" path="description">
      <n-date-picker v-model:value="model.range" type="datetimerange" clearable />
    </n-form-item>
    <n-form-item label="加班" path="unit">
      <n-select
        v-model:value="model.overTimeId"
        placeholder="Select"
        :options="store.getOverTimeObject"
      />
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
  <n-button strong secondary type="primary" class="btn" @click="handleAdd"> 确认 </n-button>
</template>

<style scoped>
.btn {
  margin-left: 470px;
}
</style>
