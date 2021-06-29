"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.get = void 0;
const fs = require("fs");
function get(path, key) {
    const ConfPath = path + '.config.json';
    const isExists = fs.existsSync(ConfPath);
    let setting;
    if (isExists) {
        setting = JSON.parse(fs.readFileSync(ConfPath, 'utf-8'));
    }
    else {
        return false;
    }
    return setting[key];
}
exports.get = get;
function set(path, key, value) {
    const newPath = path + '.config.json';
    const isExists = fs.existsSync(newPath);
    let setting;
    if (isExists) {
        setting = JSON.parse(fs.readFileSync(newPath, 'utf-8'));
    }
    else {
        setting = {};
    }
    setting[key] = value.toString();
    fs.writeFileSync(newPath, JSON.stringify(setting));
}
exports.set = set;
//# sourceMappingURL=config.js.map