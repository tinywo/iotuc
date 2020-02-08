const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;
const store = require('electron-store');
const events = require('events');
const os = require('os');
const path = require('path');
const shell = electron.shell;
const img = path.join(__dirname, '../../static/img');
const serialPort = require('serialport');
const ipcMain = electron.ipcMain;

let host = '';
const tray = electron.Tray;
let appTray = null;

//  设置存储
const storeSettingSchema = {
    version: {
        type: 'string'
    },
    serial: {
        port: {
            type: 'string',
            default: 'com1'
        },
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
    },
    websocket: {
        port: {
            type: 'number',
            default: 8000
        }
    },
    tcp: {
        port: {
            type: 'number',
            default: 8001
        }
    },
    udp: {
        port: {
            type: 'number',
            default: 8002
        }
    },
    service: {
        serialPort: {
            type: 'boolean',
            default: false
        },
        mysql: {
            type: 'boolean',
            default: false
        },
        websocket: {
            type: 'boolean',
            default: false
        },
        tcp: {
            type: 'boolean',
            default: false
        },
        udp: {
            type: 'boolean',
            default: false
        },
    }
};
const storeSetting = new store({storeSettingSchema});

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "iot"
});

function init() {
    getIpAddress();
    if (storeSetting.has('version')) {
        loadSetting();
    } else {
        storeSetting.set({
            version: '0.0.1',
            serial: {
                port: 'com1',
                baudRate: 115200
            },
            mysql: {
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: 'root',
                database: 'iot',
                table: 'data'
            },
            websocket: {
                port: 8000
            },
            tcp: {
                port: 8001
            },
            udp: {
                port: 8002
            },
            service: {
                serialPort: false,
                mysql: false,
                websocket: false,
                tcp: false,
                udp: false
            }
        });
    }
}

//  读取Setting
let setting = {};

function loadSetting() {
    setting.serialPort = storeSetting.get('serial.port');
    setting.serialBaudRate = storeSetting.get('serial.baudRate');
    setting.mysqlHost = storeSetting.get('mysql.host');
    setting.mysqlPort = storeSetting.get('mysql.port');
    setting.mysqlUser = storeSetting.get('mysql.user');
    setting.mysqlPassword = storeSetting.get('mysql.password');
    setting.mysqlDatabase = storeSetting.get('mysql.database');
    setting.mysqlTable = storeSetting.get('mysql.table');
    setting.websocketPort = storeSetting.get('websocket.port');
    setting.tcpPort = storeSetting.get('tcp.port');
    setting.udpPort = storeSetting.get('udp.port');
    setting.serviceSerialPort = storeSetting.get('service.serialPort');
    setting.serviceMysql = storeSetting.get('service.mysql');
    setting.serviceWebsocket = storeSetting.get('service.websocket');
    setting.serviceTcp = storeSetting.get('service.tcp');
    setting.serviceUdp = storeSetting.get('service.udp');
    setting.ip = host;
    return setting
}

function addSql(temp, hum) {
    const addSql = 'INSERT INTO data(Id,temp,hum,create)VALUE (0,?,?,?)';
    let nowTime = Date.now();
    const addSqlParams = [temp, hum, nowTime];
    conn.query(addSql, addSqlParams, (err, result) => {
        if (err) return console.log('[ErrorInfo]: ', err.message);
    });
}

//  获取可用串口
let activePort = [];
let plug = '';

function getSerialPort() {
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

//  serialPortService
let servicePortServiceEventEmitter = new events.EventEmitter();
let servicePortServiceHandler = function on() {
    console.log('serialport');
    getSerialPort();
    let port = new serialPort('com2', {
        baudRate: 115200,
    });
    port.on('open', function () {
        port.on('data', function (data) {
            let str = data.toString();
            servicePortServiceEventEmitter.emit('listenTemp', str)
        })
    });
};

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
        show: false,//先隐藏
        webPreferences: {
            webSecurity: false
        }
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
        mainWindow.show();//初始化完成后显示防止启动白屏
        init(); //自定义的初始函数
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
let routerPushEventEmitter = new events.EventEmitter();
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

//  获取配置
ipcMain.on('getSetting', function (event) {
    event.sender.send('freshSetting', setting);
});

//  串口开关
ipcMain.on('serviceSerial', function (event, args) {
    if (args === 'on') {
        getSerialPort();
        let port = new serialPort('com1', {
            baudRate: 115200
        });
        port.on('open', function () {
            port.on('data', function (data) {
                let str = data.toString();
                //console.log(str);
                event.sender.send('showTemp', str);
                listenTempEventEmitter.emit('listenTemp', str)
            })
        });
    }

    /*let port = new serialPort(setting['serialPort'], {
        baudRate: setting['serialBaudRate']
    });*/

});

//  监测温度
let listenTempEventEmitter = new events.EventEmitter();
ipcMain.on('listenTemp', function (event) {
    listenTempEventEmitter.on('listTemp', function (data) {
        let str = data.substr(0, 2);
        event.send('showTemp', str);
    });
    /*    let port = new serialPort(setting.serialPort, {
        baudRate: setting.serialBaudRate
    });
    port.on('open', function () {
        port.on('data', function (data) {
            let str = data.toString();

        })
    })*/
});

ipcMain.on('listenAll', function (event) {
    SPeventEmitter = new events.EventEmitter();
    goSettingEventEmitter.on('goSetting', function (msg) {
        event.sender.send('goSetting');
    });
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