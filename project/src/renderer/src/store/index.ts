import { defineStore } from 'pinia'
import { holiday, leaveTime, overTime, personnel, scheduling } from '../utils/dbType'

const useStore = defineStore('store', {
  state: () => ({
    // 用于存储所有的 holiday
    holiday: [] as holiday[],
    // 用于存储所有的 leaveTime
    leaveTime: [] as leaveTime[],
    // 用于存储所有的 overTime
    overTime: [] as overTime[],
    // 用于存储所有的 personnel
    personnel: [] as personnel[],
    // 用于存储所有的 scheduling
    scheduling: [] as scheduling[]
  }),
  getters: {
    // 用于存储所有的 holiday 的选项
    historyOptions(): { label: holiday['name']; value: holiday['id'] }[] {
      return this.holiday
        .filter((item) => {
          return item.status == 1
        })
        .map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
    },
    leaveTimeOptions(): { label: leaveTime['name']; value: leaveTime['id'] }[] {
      return this.leaveTime
        .filter((item) => {
          return item.status == 1
        })
        .map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
    },
    overTimeOptions(): { label: overTime['name']; value: overTime['id'] }[] {
      return this.overTime
        .filter((item) => {
          return item.status == 1
        })
        .map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
    }
  },
  actions: {
    // 根据传入的 id 修改对应的 holiday
    updateHoliday(data: holiday) {
      const index = this.holiday.findIndex((item) => item.id === data.id)
      this.holiday[index] = data
    },
    // 根据传入的 id 删除对应的 holiday
    deleteHoliday(id: string) {
      const index = this.holiday.findIndex((item) => item.id === id)
      this.holiday.splice(index, 1)
    },
    // 根据传入的 id 修改对应的 leaveTime
    updateLeaveTime(data: leaveTime) {
      const index = this.leaveTime.findIndex((item) => item.id === data.id)
      this.leaveTime[index] = data
    },
    // 根据传入的 id 删除对应的 leaveTime
    deleteLeaveTime(id: string) {
      const index = this.leaveTime.findIndex((item) => item.id === id)
      this.leaveTime.splice(index, 1)
    },
    // 根据传入的 id 修改对应的 overTime
    updateOverTime(data: overTime) {
      const index = this.overTime.findIndex((item) => item.id === data.id)
      this.overTime[index] = data
    },
    // 根据传入的 id 删除对应的 overTime
    deleteOverTime(id: string) {
      const index = this.overTime.findIndex((item) => item.id === id)
      this.overTime.splice(index, 1)
    },
    // 根据传入的 id 修改对应的 personnel
    updatePersonnel(data: personnel) {
      const index = this.personnel.findIndex((item) => item.id === data.id)
      this.personnel[index] = data
    },
    // 根据传入的 id 删除对应的 personnel
    deletePersonnel(id: string) {
      const index = this.personnel.findIndex((item) => item.id === id)
      this.personnel.splice(index, 1)
    },
    // 根据传入的 id 修改对应的 scheduling
    updateScheduling(data: scheduling) {
      const index = this.scheduling.findIndex((item) => item.id === data.id)
      this.scheduling[index] = data
    },
    // 根据传入的 id 删除对应的 scheduling
    deleteScheduling(id: string) {
      const index = this.scheduling.findIndex((item) => item.id === id)
      this.scheduling.splice(index, 1)
    },
    // 根据 leaveTime 的 unit 字段 是 小时（h） 还是 天（d）（按照 8小时1天 算）返回 除数
    getLeaveTimeUnit(leaveTimeId: string) {
      const index = this.leaveTime.findIndex((item) => item.id === leaveTimeId)
      if (this.leaveTime[index].unit === 'h') {
        return 8
      } else {
        return 1
      }
    },
    // 根据 overTime 的 unit 字段 是 小时（h） 还是 天（d）（按照 8小时1天 算）返回 天数
    getOverTimeDateById(overTimeId: string) {
      const overTime = this.overTime.filter((item) => item.id === overTimeId)[0]
      return overTime.defaultNumber / (overTime.unit == 'h' ? 8 : 1)
    }
  }
})

export { useStore }
