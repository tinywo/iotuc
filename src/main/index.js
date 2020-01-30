const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;
const path = require('path');
const shell = electron.shell;
const img = path.join(__dirname, '../../static/img');
const serialPort = require('serialport');
const ipcMain = electron.ipcMain;
let activePort = [];
let plug = '';
let host = '';
const tray = electron.Tray;
let appTray = null;
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "iot"
});
const addSql = 'INSERT INTO data(Id,temp,hum,create)VALUE (0,?,?,?)';
const addSqlParams = [11, 22, '2020-1-23 16:43:00'];
conn.query(addSql, addSqlParams, (err, result) => {
    if (err) return console.log('[ErrorInfo]: ', err.message);
});
//  遍历串口端口
serialPort.list().then(
    ports => ports.forEach(activePort),
    err => console.error(err)
);

//  可用的端口
function activePorts(item, index) {
    activePort[index] = item.path;
    plug = activePort[0];
}

//  获取本机IP
function getIpAddress() {
    let interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                var ip = alias.address;
            }
        }
    }
    host = ip;
    return ip;
}

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
    /**
     * Initial window options
     */
    //  隐藏菜单
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
        height: 604,
        useContentSize: true,
        width: 1040,
        frame: false,
        show: false//先隐藏
    });
    mainWindow.loadURL(winURL);
    var trayMenuTemplate = [
        {
            label: '设置',
            click: function () {
                shell.openExternal("//www.tinywo.com")
            }
        },
        {
            label: '帮助',
            click: function () {
                shell.openExternal("//www.tinywo.com")
            }
        },
        {
            label: '关于',
            click: function () {
                shell.openExternal("//www.tinywo.com")
            }
        },
        {
            label: '退出',
            click: function () {
                mainWindow.close();
            }
        }
    ];
    appTray = new tray(path.join(img, 'tray.ico'));
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    appTray.setToolTip('次奥物联网');
    appTray.setContextMenu(contextMenu);
    appTray.on('click', function () {
        mainWindow.show();
    });
    mainWindow.webContents.openDevTools();
    //  调试控制台
    mainWindow.on('ready-to-show', function () {
        mainWindow.show()//初始化完成后显示防止启动白屏
    });
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});

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
