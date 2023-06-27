import { ipcMain } from 'electron'
import {
  holidaySelect,
  holidayAdd,
  holidayUpdate,
  holidayDelete,
  leaveTimeSelect,
  leaveTimeAdd,
  leaveTimeUpdate,
  leaveTimeDelete,
  overTimeSelect,
  overTimeAdd,
  overTimeUpdate,
  overTimeDelete,
  personnelSelect,
  personnelAdd,
  personnelUpdate,
  personnelDelete,
  schedulingSelect,
  schedulingAdd,
  schedulingUpdate,
  schedulingDelete,
  holidayLogSelect,
  holidayLogAdd,
  holidayLogNewData,
  overTimeLogAdd,
  leaveTimeLogAdd
} from '../db/api/index'
import {
  holiday,
  leaveTime,
  overTime,
  personnel,
  scheduling,
  holidayLog,
  overTimeLog,
  leaveTimeLog
} from '../db/api/dbType'

ipcMain.handle('holidaySelect', () => {
  return holidaySelect()
})

ipcMain.handle('holidayAdd', (_event, value: holiday) => {
  return holidayAdd(value)
})

ipcMain.handle('holidayUpdate', (_event, value: holiday) => {
  return holidayUpdate(value)
})

ipcMain.handle('holidayDelete', (_event, value: string) => {
  return holidayDelete(value)
})

ipcMain.handle('leaveTimeSelect', () => {
  return leaveTimeSelect()
})

ipcMain.handle('leaveTimeAdd', (_event, value: leaveTime) => {
  return leaveTimeAdd(value)
})

ipcMain.handle('leaveTimeUpdate', (_event, value: leaveTime) => {
  return leaveTimeUpdate(value)
})

ipcMain.handle('leaveTimeDelete', (_event, value: string) => {
  return leaveTimeDelete(value)
})

ipcMain.handle('overTimeSelect', () => {
  return overTimeSelect()
})

ipcMain.handle('overTimeAdd', (_event, value: overTime) => {
  return overTimeAdd(value)
})

ipcMain.handle('overTimeUpdate', (_event, value: overTime) => {
  return overTimeUpdate(value)
})

ipcMain.handle('overTimeDelete', (_event, value: string) => {
  return overTimeDelete(value)
})

ipcMain.handle('personnelSelect', () => {
  return personnelSelect()
})

ipcMain.handle('personnelAdd', (_event, value: personnel) => {
  return personnelAdd(value)
})

ipcMain.handle('personnelUpdate', (_event, value: personnel) => {
  return personnelUpdate(value)
})

ipcMain.handle('personnelDelete', (_event, value: string) => {
  return personnelDelete(value)
})

ipcMain.handle('schedulingSelect', () => {
  return schedulingSelect()
})

ipcMain.handle('schedulingAdd', (_event, value: scheduling) => {
  return schedulingAdd(value)
})

ipcMain.handle('schedulingUpdate', (_event, value: scheduling) => {
  return schedulingUpdate(value)
})

ipcMain.handle('schedulingDelete', (_event, value: string) => {
  return schedulingDelete(value)
})

ipcMain.handle('holidayLogSelect', () => {
  return holidayLogSelect()
})

ipcMain.handle('holidayLogAdd', (_event, value: holidayLog) => {
  return holidayLogAdd(value)
})

ipcMain.handle('holidayLogNewData', (_event, value: { personnelId: string; holidayId: string }) => {
  const { personnelId, holidayId } = value
  return holidayLogNewData(personnelId, holidayId)
})

ipcMain.handle('overTimeLogAdd', (_event, value: overTimeLog) => {
  return overTimeLogAdd(value)
})

ipcMain.handle('leaveTimeLogAdd', (_event, value: leaveTimeLog) => {
  return leaveTimeLogAdd(value)
})
