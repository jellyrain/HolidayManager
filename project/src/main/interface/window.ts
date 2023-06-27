import { app, ipcMain, BrowserWindow } from 'electron'

ipcMain.on('close', () => {
  app.quit()
})

ipcMain.on('minimum', (event) => {
  BrowserWindow.fromWebContents(event.sender)!.minimize()
})

ipcMain.on('maximum', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)!
  if (window.isMaximized()) {
    window.unmaximize()
  } else {
    window.maximize()
  }
})
