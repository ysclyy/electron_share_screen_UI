'use strict';
const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const ipcMain = electron.remote.ipcMain

const path = require('path');

var modalPath = path.join('file://', __dirname, './ShareScreenUI.html')

module.exports = function(onSuccess, onFailure) {
  var win = new BrowserWindow({ 
    width: 620, 
    height: 555,
    show: false,
    resizable: false,
    alwaysOnTop: true
  })
  win.on('close', function () { win = null })
  win.loadURL(modalPath);
  win.show();

  ipcMain.on('selectScreen', (event, sourceId) => {
    win.close();
    win = null;
    onSuccess && onSuccess(sourceId);
  })

  ipcMain.on('closeWin', (event, sourceId) => {
    win.close();
    win = null;
    onFailure && onFailure('NotAllowedError');
  })
}