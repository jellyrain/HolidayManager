<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { useNotification } from 'naive-ui'
import { uuidv4 } from '../../utils/utils'
import { scheduling, holidayLog } from '../../utils/dbType'
import { useStore } from '../../store/index'

const { schedulingAdd, holidayLogAdd, schedulingUpdate, holidayLogNewData } = window.api as {
  schedulingAdd: (data: scheduling) => void
  holidayLogAdd: (data: holidayLog) => void
  schedulingUpdate: (data: scheduling) => void
  holidayLogNewData: (personnelId: string, holidayId: string) => Promise<holidayLog>
}

const props = defineProps<{
  falseModal: () => void
  personnelId: string
}>()

// 弹窗
const notification = useNotification()

// 获取 store
const store = useStore()

const model: scheduling = reactive({
  id: uuidv4(),
  personnelId: props.personnelId,
  holidayId: '',
  vacationTime: 0
})

notification.info({
  content: '配置提示',
  meta: '如果假期已经配置，还是选择就是更新假期初始日期(一般配合重置的假期使用)',
  duration: 4000,
  keepAliveOnHover: true
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
  } else {
    // 获取当前 scheduling 是否有数据，如果 不为 null 说明已经设置过了应该覆盖，如果为 null 说明是第一次设置
    const index = store.scheduling.findIndex((item) => {
      return item.personnelId == model.personnelId && item.holidayId == model.holidayId
    })

    const scheduling = store.scheduling[index]

    if (scheduling && scheduling.vacationTime != null) {
      holidayLogNewData(model.personnelId, model.holidayId).then((res) => {
        store.scheduling[index].vacationTime =
          store.scheduling[index].vacationTime - res[0].number + model.vacationTime
        schedulingUpdate(toRaw(store.scheduling[index]))
      })
    } else {
      schedulingAdd(toRaw(model))
      store.scheduling.push(model)
    }
    holidayLogAdd({
      id: uuidv4(),
      personnelId: props.personnelId,
      holidayId: model.holidayId,
      number: model.vacationTime,
      description: ''
    })
    props.falseModal()
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
        :options="store.historyOptions"
      />
    </n-form-item>
    <n-form-item label="默认计数" path="defaultNumber">
      <n-input-number v-model:value="model.vacationTime" />
    </n-form-item>
  </n-form>
  <n-button strong secondary type="primary" class="btn" @click="handleAdd"> 确认 </n-button>
</template>

<style scoped>
.btn {
  margin-left: 470px;
}
</style>
