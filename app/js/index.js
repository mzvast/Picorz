const { ipcRenderer } = require('electron')
const container = document.getElementById('container')
container.ondragover = () => {
    return false;
}
container.ondragleave = container.ondragend = () => {
    return false;
}
container.ondrop = (e) => {
    e.preventDefault()
    for (let f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
    }
    ipcRenderer.send('upload', e.dataTransfer.files[0].path)
    return false;
}  