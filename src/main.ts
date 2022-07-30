import * as dotenv from 'dotenv';
import { app, BrowserWindow, BrowserView } from 'electron';

dotenv.config();

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'wx-read',

    height: 800,
    width: 1280,

    autoHideMenuBar: process.env.NODE_ENV === 'dev' ? false : true,

    webPreferences: {
      nodeIntegration: true,
    },
  });

  const view = new BrowserView();
  mainWindow.setBrowserView(view);

  view.setAutoResize({ width: true, height: true, horizontal: true, vertical: true });
  view.webContents.loadURL('https://weread.qq.com/');
  view.webContents.on('did-finish-load', () => {
    view.setBounds({ x: 0, y: 0, width: 1280, height: 800 });
  });

  // Open the DevTools.
  process.env.NODE_ENV === 'dev' && mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
