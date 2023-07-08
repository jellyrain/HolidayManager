import { ipcRenderer } from 'electron'
import {
  holiday,
  leaveTime,
  overTime,
  personnel,
  scheduling,
  holidayLog,
  overTimeLog,
  leaveTimeLog
} from '../../main/db/api/dbType'

function holidaySelect(data: holiday) {
  return ipcRenderer.invoke('holidaySelect', data)
}

function holidayAdd(data: holiday) {
  return ipcRenderer.invoke('holidayAdd', data)
}

function holidayUpdate(data: holiday) {
  return ipcRenderer.invoke('holidayUpdate', data)
}

function holidayDelete(data: string) {
  return ipcRenderer.invoke('holidayDelete', data)
}

function leaveTimeSelect() {
  return ipcRenderer.invoke('leaveTimeSelect')
}

function leaveTimeAdd(data: leaveTime) {
  return ipcRenderer.invoke('leaveTimeAdd', data)
}

function leaveTimeUpdate(data: leaveTime) {
  return ipcRenderer.invoke('leaveTimeUpdate', data)
}

function leaveTimeDelete(data: string) {
  return ipcRenderer.invoke('leaveTimeDelete', data)
}

function overTimeSelect() {
  return ipcRenderer.invoke('overTimeSelect')
}

function overTimeAdd(data: overTime) {
  return ipcRenderer.invoke('overTimeAdd', data)
}

function overTimeUpdate(data: overTime) {
  return ipcRenderer.invoke('overTimeUpdate', data)
}

function overTimeDelete(data: string) {
  return ipcRenderer.invoke('overTimeDelete', data)
}

function personnelSelect() {
  return ipcRenderer.invoke('personnelSelect')
}

function personnelAdd(data: personnel) {
  return ipcRenderer.invoke('personnelAdd', data)
}

function personnelUpdate(data: personnel) {
  return ipcRenderer.invoke('personnelUpdate', data)
}

function personnelDelete(data: string) {
  return ipcRenderer.invoke('personnelDelete', data)
}

function schedulingSelect() {
  return ipcRenderer.invoke('schedulingSelect')
}

function schedulingAdd(data: scheduling) {
  return ipcRenderer.invoke('schedulingAdd', data)
}

function schedulingUpdate(data: scheduling) {
  return ipcRenderer.invoke('schedulingUpdate', data)
}

function schedulingDelete(data: string) {
  return ipcRenderer.invoke('schedulingDelete', data)
}

function holidayLogSelect() {
  return ipcRenderer.invoke('holidayLogSelect')
}

function holidayLogAdd(data: holidayLog) {
  return ipcRenderer.invoke('holidayLogAdd', data)
}

function holidayLogNewData(personnelId: string, holidayId: string) {
  const data = { personnelId, holidayId }
  return ipcRenderer.invoke('holidayLogNewData', data)
}

function overTimeLogSelect() {
  return ipcRenderer.invoke('overTimeLogSelect')
}

function overTimeLogAdd(data: overTimeLog) {
  return ipcRenderer.invoke('overTimeLogAdd', data)
}

function leaveTimeLogSelect() {
  return ipcRenderer.invoke('leaveTimeLogSelect')
}

function leaveTimeLogAdd(data: leaveTimeLog) {
  return ipcRenderer.invoke('leaveTimeLogAdd', data)
}

export default {
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
  overTimeLogSelect,
  overTimeLogAdd,
  leaveTimeLogSelect,
  leaveTimeLogAdd
}
