import { ipcRenderer } from 'electron'

function close() {
  ipcRenderer.send('close')
}

function minimum() {
  ipcRenderer.send('minimum')
}

function maximum() {
  ipcRenderer.send('maximum')
}

export default { close, minimum, maximum }
