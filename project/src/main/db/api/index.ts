import { SQLiteDB } from '../connection/dbIndex'
import {
  holiday,
  leaveTime,
  overTime,
  personnel,
  scheduling,
  holidayLog,
  leaveTimeLog,
  overTimeLog
} from './dbType'

const sqlite = new SQLiteDB('./data.db')

function holidaySelect() {
  return sqlite.all(`
        SELECT * FROM holiday
    `)
}

function holidayAdd(data: holiday) {
  sqlite.run(
    `
        INSERT INTO holiday (id, name, unit, status, reset, startTime, description) VALUES ( ?, ?, ?, ?, ?, ?, ?)
    `,
    [data.id, data.name, data.unit, data.status, data.reset, data.startTime, data.description]
  )
}

function holidayUpdate(data: holiday) {
  sqlite.run(
    `
        UPDATE holiday SET name = ?, unit = ?, status = ?, reset = ?, startTime = ?, description = ? WHERE id = ?
    `,
    [data.name, data.unit, data.status, data.reset, data.startTime, data.description, data.id]
  )
}

function holidayDelete(id: string) {
  sqlite.run(
    `
        DELETE FROM holiday WHERE id = ?
    `,
    [id]
  )
}

function leaveTimeSelect() {
  return sqlite.all(`
        SELECT * FROM leaveTime
    `)
}

function leaveTimeAdd(data: leaveTime) {
  sqlite.run(
    `
        INSERT INTO leaveTime (id, name, unit, status, description) VALUES ( ?, ?, ?, ?, ?)
    `,
    [data.id, data.name, data.unit, data.status, data.description]
  )
}

function leaveTimeUpdate(data: leaveTime) {
  sqlite.run(
    `
        UPDATE leaveTime SET name = ?, unit = ?, status = ?, description = ? WHERE id = ?
    `,
    [data.name, data.unit, data.status, data.description, data.id]
  )
}

function leaveTimeDelete(id: string) {
  sqlite.run(
    `
        DELETE FROM leaveTime WHERE id = ?
    `,
    [id]
  )
}

function overTimeSelect() {
  return sqlite.all(`
        SELECT * FROM overTime
    `)
}

function overTimeAdd(data: overTime) {
  sqlite.run(
    `
        INSERT INTO overTime (id, name, unit, status, defaultNumber, description) VALUES ( ?, ?, ?, ?, ?, ?)
    `,
    [data.id, data.name, data.unit, data.status, data.defaultNumber, data.description]
  )
}

function overTimeUpdate(data: overTime) {
  sqlite.run(
    `
        UPDATE overTime SET name = ?, unit = ?, status = ?, defaultNumber = ?, description = ? WHERE id = ?
    `,
    [data.name, data.unit, data.status, data.defaultNumber, data.description, data.id]
  )
}

function overTimeDelete(id: string) {
  sqlite.run(
    `
        DELETE FROM overTime WHERE id = ?
    `,
    [id]
  )
}

function personnelSelect() {
  return sqlite.all(`
        SELECT * FROM personnel
    `)
}

function personnelAdd(data: personnel) {
  sqlite.run(
    `
        INSERT INTO personnel (id, name, status) VALUES ( ?, ?, ?)
    `,
    [data.id, data.name, data.status]
  )
}

function personnelUpdate(data: personnel) {
  sqlite.run(
    `
        UPDATE personnel SET name = ?, status = ? WHERE id = ?
    `,
    [data.name, data.status, data.id]
  )
}

function personnelDelete(id: string) {
  sqlite.run(
    `
        DELETE FROM personnel WHERE id = ?
    `,
    [id]
  )
}

function schedulingSelect() {
  return sqlite.all(`
        SELECT * FROM scheduling
    `)
}

function schedulingAdd(data: scheduling) {
  sqlite.run(
    `
        INSERT INTO scheduling (id, personnelId, holidayId, vacationTime) VALUES ( ?, ?, ?, ?)
    `,
    [data.id, data.personnelId, data.holidayId, data.vacationTime]
  )
}

function schedulingUpdate(data: scheduling) {
  sqlite.run(
    `
        UPDATE scheduling SET personnelId = ?, holidayId = ?, vacationTime = ? WHERE id = ?
    `,
    [data.personnelId, data.holidayId, data.vacationTime, data.id]
  )
}

function schedulingDelete(id: string) {
  sqlite.run(
    `
        DELETE FROM scheduling WHERE id = ?
    `,
    [id]
  )
}

function holidayLogSelect() {
  return sqlite.all(`
        SELECT * FROM holidayLog
    `)
}

function holidayLogNewData(personnelId: string, holidayId: string) {
  return sqlite.all(`
        SELECT *
        FROM holidayLog
        WHERE personnelId = '${personnelId}'
          AND holidayId = '${holidayId}'
        ORDER BY logTime DESC
        LIMIT 1
    `)
}

function holidayLogAdd(data: holidayLog) {
  sqlite.run(
    `
        INSERT INTO holidayLog (id, personnelId, holidayId, number, description) VALUES ( ?, ?, ?, ?, ?)
    `,
    [data.id, data.personnelId, data.holidayId, data.number, data.description]
  )
}

function holidayLogUpdate(data: holidayLog) {
  sqlite.run(
    `
        UPDATE holidayLog SET personnelId = ?, holidayId = ?, number = ?, description = ? WHERE id = ?
    `,
    [data.personnelId, data.holidayId, data.number, data.description, data.id]
  )
}

function holidayLogDelete(id: string) {
  sqlite.run(
    `
        DELETE FROM holidayLog WHERE id = ?
    `,
    [id]
  )
}

function leaveTimeLogSelect() {
  return sqlite.all(`
        SELECT * FROM leaveTimeLog
    `)
}

function leaveTimeLogAdd(data: leaveTimeLog) {
  sqlite.run(
    `
        INSERT INTO leaveTimeLog (id, personnelId, holidayId, leaveTimeId, number, description) VALUES ( ?, ?, ?, ?, ?, ?)
    `,
    [data.id, data.personnelId, data.holidayId, data.leaveTimeId, data.number, data.description]
  )
}

function leaveTimeLogUpdate(data: leaveTimeLog) {
  sqlite.run(
    `
        UPDATE leaveTimeLog SET personnelId = ?, holidayId = ?, leaveTimeId = ?, number = ?, description = ? WHERE id = ?
    `,
    [data.personnelId, data.holidayId, data.leaveTimeId, data.number, data.description, data.id]
  )
}

function leaveTimeLogDelete(id: string) {
  sqlite.run(
    `
        DELETE FROM leaveTimeLog WHERE id = ?
    `,
    [id]
  )
}

function overTimeLogSelect() {
  return sqlite.all(`
        SELECT * FROM overTimeLog
    `)
}

function overTimeLogAdd(data: overTimeLog) {
  sqlite.run(
    `
        INSERT INTO overTimeLog (id, personnelId, holidayId, overTimeId, description) VALUES ( ?, ?, ?, ?, ?)
    `,
    [data.id, data.personnelId, data.holidayId, data.overTimeId, data.description]
  )
}

function overTimeLogUpdate(data: overTimeLog) {
  sqlite.run(
    `
        UPDATE overTimeLog SET personnelId = ?, holidayId = ?, overTimeId = ?, description = ? WHERE id = ?
    `,
    [data.personnelId, data.holidayId, data.overTimeId, data.description, data.id]
  )
}

function overTimeLogDelete(id: string) {
  sqlite.run(
    `
        DELETE FROM overTimeLog WHERE id = ?
    `,
    [id]
  )
}

export {
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
  holidayLogNewData,
  holidayLogAdd,
  holidayLogUpdate,
  holidayLogDelete,
  leaveTimeLogSelect,
  leaveTimeLogAdd,
  leaveTimeLogUpdate,
  leaveTimeLogDelete,
  overTimeLogSelect,
  overTimeLogAdd,
  overTimeLogUpdate,
  overTimeLogDelete
}
