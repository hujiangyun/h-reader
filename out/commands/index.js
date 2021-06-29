"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressUpdate = exports.goProgress = exports.editTemplateCss = exports.editTemplateHtml = exports.searchOnline = exports.openLocalDirectory = exports.localRefresh = exports.openReaderWebView = void 0;
const index_1 = require("../utils/index");
const store_1 = require("../utils/store");
const vscode_1 = require("vscode");
const reader_1 = require("../reader");
const explorerNodeManager_1 = require("../explorer/explorerNodeManager");
const treeDataProvider_1 = require("../explorer/treeDataProvider");
const PreviewProvider_1 = require("../webview/PreviewProvider");
const config_1 = require("../config");
const ReaderManager_1 = require("../ReaderManager");
const config = require("../utils/config");
const notification_1 = require("../utils/notification");
const path = require("path");
exports.openReaderWebView = function (treeNode) {
    reader_1.readerDriver.getContent(treeNode).then(function (data) {
        PreviewProvider_1.previewProvider.show(data, treeNode);
    });
};
exports.localRefresh = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const notification = new notification_1.Notification('加载本地小说');
        try {
            const treeNode = yield explorerNodeManager_1.explorerNodeManager.getAllBooks();
            treeDataProvider_1.treeDataProvider.fire();
            explorerNodeManager_1.explorerNodeManager.treeNode = treeNode;
        }
        catch (error) {
            console.warn(error);
        }
        notification.stop();
    });
};
exports.openLocalDirectory = function () {
    index_1.open(reader_1.readerDriver.getFileDir());
};
const _searchOnline = function (msg) {
    return __awaiter(this, void 0, void 0, function* () {
        const notification = new notification_1.Notification(`搜索: ${msg}`);
        try {
            const vConfig = vscode_1.workspace.getConfiguration('z-reader');
            const onlineSite = vConfig.get('onlineSite', '起点');
            const treeNode = yield reader_1.readerDriver.search(msg, onlineSite);
            treeDataProvider_1.treeDataProvider.fire();
            explorerNodeManager_1.explorerNodeManager.treeNode = treeNode;
        }
        catch (error) {
            console.warn(error);
        }
        notification.stop();
    });
};
exports.searchOnline = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const msg = yield vscode_1.window.showInputBox({
                password: false,
                ignoreFocusOut: false,
                placeHolder: '请输入小说的名字',
                prompt: ''
            });
            if (msg) {
                _searchOnline(msg);
            }
        }
        catch (error) {
            console.warn(error);
        }
    });
};
exports.editTemplateHtml = function () {
    openTextDocument(path.join(store_1.store.extensionPath, config_1.TemplatePath.templateHtml));
};
exports.editTemplateCss = function () {
    openTextDocument(path.join(store_1.store.extensionPath, config_1.TemplatePath.templateCss));
};
const openTextDocument = function (path) {
    vscode_1.workspace.openTextDocument(path).then((res) => {
        vscode_1.window.showTextDocument(res, {
            preview: false
        });
    });
};
exports.goProgress = function () {
    vscode_1.window
        .showInputBox({
        password: false,
        ignoreFocusOut: false,
        placeHolder: '请输入进度: 0-100',
        validateInput: (text) => (/^\d+(\.\d+)?$/.test(text) ? undefined : '请输入数字')
    })
        .then((msg) => {
        PreviewProvider_1.previewProvider.postMessage({
            command: 'goProgress',
            data: {
                progress: Number(msg) * 0.01
            }
        });
    });
};
exports.progressUpdate = function (data) {
    console.log('progressUpdate:', data.progress);
    ReaderManager_1.readerManager.emit('StatusbarUpdateStatusBar', (data.progress * 100).toFixed(2) + '%');
    const treeNode = PreviewProvider_1.previewProvider.getTreeNode();
    if (treeNode && treeNode.type === '.txt' && typeof treeNode.path === 'string') {
        config.set(treeNode.path, 'progress', data.progress);
    }
};
//# sourceMappingURL=index.js.map