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
    // 读取 holiday
    getHoliday(): holiday[] {
      return this.holiday
    },
    // 读取 leaveTime
    getLeaveTime(): leaveTime[] {
      return this.leaveTime
    },
    // 读取 overTime
    getOverTime(): overTime[] {
      return this.overTime
    },
    // 读取 personnel
    getPersonnel(): personnel[] {
      return this.personnel
    },
    // 读取 scheduling
    getScheduling(): scheduling[] {
      return this.scheduling
    },
    // 读取 holiday 封装为 null 对象
    getHolidayObjectValueNull() {
      const holidayObject = {}
      this.holiday
        .filter((item) => {
          return item.status == 1
        })
        .forEach((holiday) => {
          holidayObject[holiday.id] = null
        })
      return holidayObject
    },
    // 读取 holiday 封装为 { value: string; label: string } 对象
    getHolidayObject(): { value: string; label: string }[] {
      return this.holiday
        .filter((item) => {
          return item.status == 1
        })
        .map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
    },
    //  读取 overTime 封装为 { value: string; label: string } 对象
    getOverTimeObject(): { value: string; label: string }[] {
      return this.overTime
        .filter((item) => {
          return item.status == 1
        })
        .map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
    },
    // 读取 leaveTime 封装为 { value: string; label: string } 对象
    getLeaveTimeObject(): { value: string; label: string }[] {
      return this.leaveTime
        .filter((item) => {
          return item.status == 1
        })
        .map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
    },
    // 配置表格（显示假期）
    getCockpitColumns() {
      const holiday = (this as any).holiday.filter((item) => {
        return item.status == 1
      })
      return [
        ...holiday.map((item) => {
          return {
            title: item.name + '(小时)',
            key: item.id,
            render(row) {
              return row[item.id] == null ? '未配置' : row[item.id]
            }
          }
        })
      ]
    },
    // 使用计算属性 计算表格数据
    gegetCockpitDatas() {
      const result: any = []
      const holidayObject = this.getHolidayObjectValueNull

      this.getPersonnel
        .filter((item) => {
          return item.status == 1
        })
        .forEach((personnel) => {
          const data = {
            id: personnel.id,
            name: personnel.name,
            ...holidayObject
          }
          this.getScheduling
            .filter((scheduling) => scheduling.personnelId == personnel.id)
            .forEach((item) => {
              data[item.holidayId] = item.vacationTime
            })
          result.push(data)
        })
      return result
    }
  },
  actions: {
    // 写入 holiday
    setHoliday(holiday: holiday[]): void {
      this.holiday = holiday
    },
    // 写入 leaveTime
    setLeaveTime(leaveTime: leaveTime[]): void {
      this.leaveTime = leaveTime
    },
    // 写入 overTime
    setOverTime(overTime: overTime[]): void {
      this.overTime = overTime
    },
    // 写入 personnel
    setPersonnel(personnel: personnel[]): void {
      this.personnel = personnel
    },
    // 写入 scheduling
    setScheduling(scheduling: scheduling[]): void {
      this.scheduling = scheduling
    }
  }
})

export { useStore }
