const nconf = require('nconf').file({ file: getUserHome() + '/picyo-config.json' });

function saveSettings(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
}

function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function checkConfig() {
    if (!readSettings('keys')) {
        return false;
    }
    return true;
}
function checkKeys() {
    if(!checkConfig()){
        return false;
    }
    for (let i = 0; i < 4; i++) {
        if (readSettings('keys')[i] === '') {
            return false;
        }
    }
    return true;
}

function addSettings(settingKey, settingValue) {
    let temp = readSettings(settingKey);
    temp.push(settingValue);
    saveSettings(settingKey, temp);
    nconf.save();
}

function removeSettings(settingKey, settingValue) {
    let temp = readSettings(settingKey);
    temp = temp.filter(function (x) {
        return x !== settingKey;
    })
    saveSettings(settingKey, temp);
    nconf.save();
}

function initConfig() {
    if (!readSettings('keys')) {
        saveSettings('keys', ['', '', '', '']);
    }
    if (!readSettings('buckets')) {
        saveSettings('buckets', []);
    }
    if (!readSettings('domains')) {
        saveSettings('domains', []);
    }
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings,
    checkConfig: checkConfig,
    checkKeys:checkKeys,
    addSettings: addSettings,
    removeSettings: removeSettings,
    initConfig: initConfig
};