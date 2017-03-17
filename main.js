const setupEvents = require('./setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }
 
const {app, BrowserWindow,ipcMain,Menu,dialog,clipboard} = require('electron')
const path = require('path')
const url = require('url')
const moment = require('moment')
const configuration = require('./configuration.js')
var qn = require('qn');

function getClient(){
  return qn.create(getKeys())
}

function getKeys(){
  return {
    accessKey: configuration.readSettings('keys')[0],
    secretKey: configuration.readSettings('keys')[1],
    bucket: configuration.readSettings('keys')[2],
    origin: configuration.readSettings('keys')[3],
  }
}

// var client = qn.create({
//   accessKey: config.ACCESS_KEY,
//   secretKey: config.SECRET_KEY,
//   bucket: config.Bucket_Name,
//   origin: config.Domain,
//   // timeout: 3600000, // default rpc timeout: one hour, optional
//   // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
//   // uploadURL: 'http://up.qiniu.com/',
// });

// upload a file with custom key

// let filepath = './gtd.jpg'

ipcMain.on('upload', (event, arg) => {
  console.log(arg);  
  let filepath = arg; 
  let fileNameArr = path.normalize(arg).split('\\');
  let fileNameLen = fileNameArr.length;
  let filename = fileNameArr[fileNameLen-1];
  let key = filename+"("+moment().format()+")";
  
  console.log(filepath,key);
  let client = getClient();
  client.uploadFile(filepath, { key: key }, function (err, result) {
    console.log(result);
    dialog.showMessageBox(null,{
          type:"info",
          buttons:['Ok'],
          message:'markdown格式图片URL已经复制到剪贴板',
          title:'上传成功'
      },()=>{
        clipboard.writeText("![]("+result.url+")");
      });
  });
})


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
function initConfig(){
  if (!configuration.readSettings('keys')) {
        configuration.saveSettings('keys', ['', '',
        '',
        ''
        ]);
    }
}

let win

function createWindow () {
  initConfig();//初始化配置文件
  // Create the browser window.
  win = new BrowserWindow({width: 300, height: 400})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let settingsWindow = null;

function openSettingsWindow () {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({frame: false,height: 500,width: 350
    });

    settingsWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/app/settings.html'),
    protocol: 'file:',
    slashes: true
  }))

    // Open the DevTools.
    // settingsWindow.webContents.openDevTools()

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
}


function closeSettingWindow(){
  settingsWindow.close();
  console.log('cancel!');
}

// ipcMain.on('save-settings-window', ()=>{    
//   closeSettingWindow();
// });

ipcMain.on('close-settings-window',closeSettingWindow)
ipcMain.on('open-settings-window',openSettingsWindow)

const template = [
  {
    label: '工具',
    submenu: [
      {
        label: '账号设置',
        click(){
          openSettingsWindow();
        }
      }
    ]
  },
  {
    label: '关于',
    submenu: [
      {
        label: '技术支持',
        click () { require('electron').shell.openExternal('https://github.com/mzvast/picyo') }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)