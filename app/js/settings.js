const configuration = require('../configuration.js');
const { ipcRenderer } = require('electron')
const {dialog} = require('electron').remote
const saveBtn = document.getElementById('save');
const cancelBtn = document.getElementById('cancel');

var settingboxesElements = document.querySelectorAll('.settingboxes');
var fixElements = document.querySelectorAll('.fix');

for (var i = 0; i < settingboxesElements.length; i++) {
    settingboxesElements[i].value = configuration.readSettings('keys')[i];
}
fixElements[0].value = configuration.readSettings('prefix')
fixElements[1].value = configuration.readSettings('suffix')
fixElements[2].checked = configuration.readSettings('timefix')
saveBtn.onclick = function (e) {
    e.preventDefault();
    let tmp = [];
    for (var i = 0; i < settingboxesElements.length; i++) {
        tmp[i] = settingboxesElements[i].value;
    }
    configuration.saveSettings('keys',tmp);

    configuration.saveSettings('prefix',fixElements[0].value);
    configuration.saveSettings('suffix',fixElements[1].value);
    configuration.saveSettings('timefix',fixElements[2].checked);

    dialog.showMessageBox(null,{
        type:"info",
        buttons:['Ok'],
        message:'保存成功！',
        title:'恭喜'
    },()=>{
        ipcRenderer.send('close-settings-window');
    })
}