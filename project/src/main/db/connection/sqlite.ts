import sqlite3 from 'sqlite3'

class SQLiteDB {
  private dbName: string
  private db: sqlite3.Database

  constructor(dbName: string) {
    this.dbName = dbName
    this.db = new sqlite3.Database(this.dbName)
  }

  public async run(sql: string, params: Array<any> = []): Promise<{ status: string }> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err: Error) => {
        if (err) {
          reject({
            status: 'error',
            error: err
          })
        } else {
          resolve({
            status: 'success'
          })
        }
      })
    })
  }

  public async get(sql: string, params: Array<any> = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err: Error, row: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  public async all(sql: string, params: Array<any> = []): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err: Error, rows: Array<any>) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

export { SQLiteDB }
