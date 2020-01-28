import {app, BrowserWindow} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

const cmd=require('node-cmd');
console.log(__dirname);
//cmd.run('cd bin\\mysql')

function createWindow() {
    /**
     * Initial window options
     */
    //  隐藏菜单
    // Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
        height: 604,
        useContentSize: true,
        width: 1040,
        frame: false,
        show: false//先隐藏
    });
    mainWindow.loadURL(winURL)
    mainWindow.webContents.openDevTools();
    mainWindow.on('ready-to-show', function () {
        mainWindow.show()//初始化完成后显示防止启动白屏
    });
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
