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
