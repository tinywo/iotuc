const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;
const store = require('electron-store');
const events = require('events');
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

//  设置存储
const storeSettingSchema = {
    serial: {
        baudRate: {
            type: 'number',
            maximum: 115200,
            minimum: 9600,
            default: 115200
        },
    },
    mysql: {
        host: {
            type: 'string',
            default: 'localhost'
        },
        port: {
            type: 'number',
            default: 3306
        },
        user: {
            type: 'string',
            default: 'root'
        },
        password: {
            type: 'string',
            default: ''
        },
        database: {
            type: 'string',
            default: 'iot'
        },
        table: {
            type: 'string',
            default: 'data'
        }
    }
};
const storeSetting = new store({storeSettingSchema});
storeSetting.set({
    serial: {
        baudRate: 115200
    },
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'iot',
        table: 'data'
    }
});
console.log(storeSetting.get('mysql.port'));
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
                routerPushEventEmitter.emit('routerPush', 'setting');
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
    //mainWindow.webContents.openDevTools();
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
//  路由跳转
var routerPushEventEmitter = new events.EventEmitter();
ipcMain.on('routerPush', function (event) {
    routerPushEventEmitter.on('routerPush', function (page) {
        event.sender.send('routerPush', page);
    });
});

//  最小、关闭命令
ipcMain.on('windowHandle', function (event, args) {
    if (args === 'min')
        mainWindow.minimize();
    else
        mainWindow.close();
});

ipcMain.on('listenAll', function (event) {
    SPeventEmitter = new events.EventEmitter();
    goSettingEventEmitter.on('goSetting', function (msg) {
        event.sender.send('goSetting');
    });
});

ipcMain.on('getSetting', function (event) {
    event.sender.send('backSetting');
});

ipcMain.on('startService', function (event, args) {
    plug = args;
    var events = require('events');
    SPeventEmitter = new events.EventEmitter();
    var WebSocketServer = WebSocket.Server;
    wss = new WebSocketServer({
        port: 8000,
        host: host
    });
    if (plug === '') {
        event.sender.send('serviceStatus', '未连接设备');
    } else {
        event.sender.send('serviceStatus', '已启动串口');
        port = new SerialPort(plug, {
            baudRate: 115200,
        });
        wss.on('connection', function (ws) {
            ws.send("连接成功");
            SPeventEmitter.on('postMsg', function (msg) {
                ws.send(msg);
            });
        });
        port.on('open', function () {
            port.on('data', function (data) {
                let txt = data.toString();
                event.sender.send('showSerialData', txt);
                let wstxt = JSON.parse(txt);
                SPeventEmitter.emit('postMsg', wstxt);
                event.sender.send('showSocketData', wstxt);
            })
        })
    }
});