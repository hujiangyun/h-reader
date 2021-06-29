"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explorerNodeManager = void 0;
const reader_1 = require("../reader");
class ExplorerNodeManager {
    constructor() {
        this.treeNode = [];
    }
    getChildren() {
        return this.treeNode;
    }
    getAllBooks() {
        return new Promise((resolve) => {
            reader_1.readerDriver.getAllBooks().then((treeNode) => {
                this.treeNode = treeNode;
                resolve(this.treeNode);
            });
        });
    }
    setTreeNode(treeNode) {
        this.treeNode = treeNode;
    }
    // 获取
    getChapter(treeNode) {
        return reader_1.readerDriver.getChapter(treeNode);
    }
    dispose() {
        this.treeNode = [];
    }
}
exports.explorerNodeManager = new ExplorerNodeManager();
//# sourceMappingURL=explorerNodeManager.js.map