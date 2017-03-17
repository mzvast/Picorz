const configuration = require('../configuration.js');
const { ipcRenderer } = require('electron')
const {dialog} = require('electron').remote
const saveBtn = document.getElementById('save');
const cancelBtn = document.getElementById('cancel');

var settingboxesElements = document.querySelectorAll('.settingboxes');

for (var i = 0; i < settingboxesElements.length; i++) {
    settingboxesElements[i].value = configuration.readSettings('keys')[i];
}
saveBtn.onclick = function (e) {
    e.preventDefault();
    for (var i = 0; i < settingboxesElements.length; i++) {
        configuration.saveSettings('keys')[i] = settingboxesElements[i].value;
    }
    dialog.showMessageBox(null,{
        type:"info",
        buttons:['Ok'],
        message:'保存成功！',
        title:'恭喜'
    },()=>{
        ipcRenderer.send('close-settings-window');
    })
}
cancelBtn.onclick = function (e) {
    e.preventDefault();
    ipcRenderer.send('close-settings-window');
}