"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.open = void 0;
const Open = require("open");
const Fs = require("fs");
const Path = require("path");
const vscode_1 = require("vscode");
exports.open = (path) => {
    return Open(path, { wait: true });
};
exports.template = (rootPath, htmlPath, data = false) => {
    const AbsHtmlPath = Path.join(rootPath, htmlPath);
    const dirPath = Path.dirname(AbsHtmlPath);
    let result = Fs.readFileSync(AbsHtmlPath, 'utf-8').replace(/(@)(.+?)"/g, (m, $1, $2) => {
        return vscode_1.Uri.file(Path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    if (data) {
        result = result.replace(/(\{\{)(.+?)(\}\})/g, (m, $1, $2) => {
            return data[$2.trim()];
        });
    }
    return result;
};
//# sourceMappingURL=index.js.map