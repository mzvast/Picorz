const nconf = require('nconf').file({file: getUserHome() + '/picyo-config.json'});

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
    let configOK = true;
    for (var i = 0; i < 4; i++) {
        if (configuration.readSettings('keys')[i] == '') {
            configOK = false;
        }
    }
    return configOK;
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings,
    checkConfig:checkConfig
};