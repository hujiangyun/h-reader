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
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const Statusbar_1 = require("./Statusbar");
const config_1 = require("./config");
const store_1 = require("./utils/store");
const treeDataProvider_1 = require("./explorer/treeDataProvider");
const Path = require("path");
const commands_1 = require("./commands");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('activate');
        // store
        store_1.store.extensionPath = context.extensionPath;
        store_1.store.booksPath = Path.join(context.extensionPath, 'book');
        context.subscriptions.push(Statusbar_1.statusbar, treeDataProvider_1.treeDataProvider, 
        // 点击事件
        vscode_1.commands.registerCommand(config_1.Commands.openReaderWebView, (data) => commands_1.openReaderWebView(data)), 
        // 刷新
        vscode_1.commands.registerCommand(config_1.Commands.localRefresh, () => commands_1.localRefresh()), 
        // 打开本地目录
        vscode_1.commands.registerCommand(config_1.Commands.openLocalDirectory, () => commands_1.openLocalDirectory()), 
        // 搜索 - 起点
        vscode_1.commands.registerCommand(config_1.Commands.searchOnline, () => commands_1.searchOnline()), vscode_1.commands.registerCommand(config_1.Commands.editTemplateHtml, () => commands_1.editTemplateHtml()), vscode_1.commands.registerCommand(config_1.Commands.editTemplateCss, () => commands_1.editTemplateCss()), vscode_1.commands.registerCommand(config_1.Commands.goProgress, () => commands_1.goProgress()), vscode_1.commands.registerCommand(config_1.Commands.progressUpdate, (data) => commands_1.progressUpdate(data)), 
        // 设置
        vscode_1.commands.registerCommand(config_1.Commands.setOnlineSite, () => __awaiter(this, void 0, void 0, function* () {
            const vConfig = vscode_1.workspace.getConfiguration('z-reader');
            const onlineSite = vConfig.get('onlineSite');
            const result = yield vscode_1.window.showQuickPick([
                {
                    label: '起点'
                },
                {
                    label: '笔趣阁'
                }
            ], {
                placeHolder: '在线搜索来源网站, 当前设置: ' + onlineSite,
                canPickMany: false
            });
            if (result && result.label) {
                vConfig.update('onlineSite', result.label, true);
            }
        })), vscode_1.commands.registerCommand(config_1.Commands.setEncoding, () => __awaiter(this, void 0, void 0, function* () {
            const vConfig = vscode_1.workspace.getConfiguration('z-reader');
            const encoding = vConfig.get('encoding', 'utf8');
            const result = yield vscode_1.window.showQuickPick([
                {
                    label: 'utf8'
                },
                {
                    label: 'gbk'
                }
            ], {
                placeHolder: 'txt文件打开编码, 当前设置: ' + encoding,
                canPickMany: false
            });
            if (result && result.label) {
                vConfig.update('encoding', result.label, true);
            }
        })), 
        // 注册 TreeView
        vscode_1.window.createTreeView(config_1.TREEVIEW_ID, {
            treeDataProvider: treeDataProvider_1.treeDataProvider,
            showCollapseAll: true
        }));
        // localRefresh();
    });
}
exports.activate = activate;
function deactivate() {
    console.log('eactivate.');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map