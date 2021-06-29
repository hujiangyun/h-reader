"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = exports.defaultProblem = void 0;
const config_1 = require("../config");
exports.defaultProblem = {
    type: '.txt',
    name: '',
    isDirectory: false,
    path: ''
};
class TreeNode {
    constructor(data) {
        this.data = data;
    }
    get name() {
        return this.data.name;
    }
    get type() {
        return this.data.type;
    }
    get path() {
        return this.data.path;
    }
    get isDirectory() {
        return this.data.isDirectory;
    }
    get previewCommand() {
        return {
            title: this.data.name,
            command: config_1.Commands.openReaderWebView,
            arguments: [this]
        };
    }
}
exports.TreeNode = TreeNode;
//# sourceMappingURL=TreeNode.js.map