// 假期表
type holiday = {
  id: string
  name: string
  status: number
  reset: number
  startTime: string | number
  resetTime: string | number
  description: string
}

// 假期日志表
type holidayLog = {
  id: string
  personnelId: string
  holidayId: string
  number: number
  logTime?: number
  description: string
}

// 休假表
type leaveTime = {
  id: string
  name: string
  status: number
  description: string
}

// 休假日志表
type leaveTimeLog = {
  id: string
  personnelId: string
  holidayId: string
  leaveTimeId: string
  number: number
  logTime?: number
  description: string
}

// 加班表
type overTime = {
  id: string
  name: string
  status: number
  description: string
}

// 加班日志表
type overTimeLog = {
  id: string
  personnelId: string
  holidayId: string
  overTimeId: string
  startTime: string | number
  endTime: string | number
  number: number
  logTime?: number
  description: string
}

// 人员表
type personnel = {
  id: string
  name: string
  status: number
}

// 假期调度表
type scheduling = {
  id: string
  personnelId: personnel['id']
  holidayId: holiday['id']
  vacationTime: number
}

export type {
  holiday,
  holidayLog,
  leaveTime,
  leaveTimeLog,
  overTime,
  overTimeLog,
  personnel,
  scheduling
}
