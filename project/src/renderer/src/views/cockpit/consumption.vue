<script setup lang="ts">
import { reactive, computed, toRaw } from 'vue'
import { useNotification } from 'naive-ui'
import { uuidv4 } from '../../utils/utils'
import { scheduling, leaveTimeLog } from '../../utils/dbType'
import { useStore } from '../../store/index'

const { schedulingUpdate, leaveTimeLogAdd } = window.api as {
  schedulingUpdate: (data: scheduling) => void
  leaveTimeLogAdd: (data: leaveTimeLog) => void
}

const props = defineProps<{
  falseModal: () => void
  personnelId: string
}>()

// 弹窗
const notification = useNotification()

// 获取 store
const store = useStore()

const model: scheduling & leaveTimeLog = reactive({
  id: uuidv4(),
  personnelId: props.personnelId,
  holidayId: '',
  leaveTimeId: '',
  number: 0,
  vacationTime: 0,
  description: ''
})

// 获取当前选择的假期的剩余天数
const holidayNumber = computed(() => {
  const index = store.scheduling.findIndex((item) => {
    return item.personnelId == model.personnelId && item.holidayId == model.holidayId
  })
  if (index != -1) {
    return store.scheduling[index].vacationTime
  } else {
    return ''
  }
})

// 获取当前选择的休假的单位
const leaveTimeUnit = computed(() => {
  const index = store.leaveTime.findIndex((item) => {
    return item.id == model.leaveTimeId
  })
  if (index != -1) {
    return store.leaveTime[index].unit == 'd' ? '天' : '小时'
  } else {
    return ''
  }
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

  if (model.leaveTimeId == '') {
    notification.warning({
      content: '提示',
      meta: '休假是必选的',
      duration: 2000,
      keepAliveOnHover: true
    })
    return
  }

  // 获取当前 scheduling 是否有数据，如果 不为 null 说明已经设置过了应该覆盖，如果为 null 说明当前选择的假期此人未配置
  const index = store.scheduling.findIndex((item) => {
    return item.personnelId == model.personnelId && item.holidayId == model.holidayId
  })

  const scheduling = store.scheduling[index]
  if (scheduling && scheduling.vacationTime != null) {
    // 如果当前选择的假期剩余天数小于休假天数，提示
    const number =
      store.scheduling[index].vacationTime -
      model.number / store.getLeaveTimeUnit(model.leaveTimeId)

    if (number < 0) {
      notification.warning({
        content: '提示',
        meta: '当前选择的假期剩余天数不足',
        duration: 2000,
        keepAliveOnHover: true
      })
      return
    }
    // 如果当前选择的假期剩余天数大于休假天数，更新剩余天数
    store.scheduling[index].vacationTime = number
    schedulingUpdate(toRaw(store.scheduling[index]))
    leaveTimeLogAdd({
      id: uuidv4(),
      personnelId: model.personnelId,
      holidayId: model.holidayId,
      leaveTimeId: model.leaveTimeId,
      number: model.number,
      description: model.description
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
        :options="store.historyOptions"
      />
    </n-form-item>
    <n-form-item label="当前假期（天）" path="description">
      <n-input v-model:value="holidayNumber" placeholder="" disabled="false" />
    </n-form-item>
    <n-form-item label="休假" path="unit">
      <n-select
        v-model:value="model.leaveTimeId"
        placeholder="Select"
        :options="store.leaveTimeOptions"
      />
    </n-form-item>
    <n-form-item label="休假计算单位" path="description">
      <n-input v-model:value="leaveTimeUnit" placeholder="" disabled="false" />
    </n-form-item>
    <n-form-item label="休假计数" path="defaultNumber">
      <n-input-number v-model:value="model.number" />
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
