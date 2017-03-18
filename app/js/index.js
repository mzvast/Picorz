const configuration = require('../configuration.js');
const { ipcRenderer,clipboard } = require('electron')
const { dialog } = require('electron').remote
const container = document.getElementById('container')
const markdownEle = document.querySelector('.markdowncheck');
const clipEle = document.querySelector('.clip');
const pickerEle = document.querySelector('.picker');

markdownEle.checked = configuration.readSettings('markdown');

container.ondragover = () => {
    return false;
}
container.ondragleave = container.ondragend = () => {
    return false;
}
container.ondrop = (e) => {
    e.preventDefault()
    if (!configuration.checkKeys()) {
        dialog.showMessageBox(null, {
            type: "info",
            buttons: ['立即设置', 'cancel'],
            message: '参数设置有误',
            title: '错误'
        }, (response) => {
            if (response === 0) {
                ipcRenderer.send('open-settings-window');
            }
        })
        return;
    }
    for (let f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
    }
    ipcRenderer.send('upload', e.dataTransfer.files[0].path)
    return false;
}

clipEle.onclick = (e)=>{
    e.preventDefault();
    ipcRenderer.send('get-clipboard')
}

markdownEle.onclick = (e) => {   
    toggleMarkdown ();
};

function toggleMarkdown () {    
    configuration.saveSettings('markdown',markdownEle.checked)    
}
