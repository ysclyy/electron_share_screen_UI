'use strict';
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow

const path = require('path');


module.exports = function() {
  const modalPath = path.join('file://', __dirname, './ShareScreenUI.html')
  let win = new BrowserWindow({ 
  	width: 620, 
  	height: 555,
  	resizable: false
  })
  win.on('close', function () { win = null })
  win.loadURL(modalPath);
  win.show();
}