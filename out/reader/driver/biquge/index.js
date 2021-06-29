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
exports.readerDriver = void 0;
const got = require("got");
const cheerio = require("cheerio");
const TreeNode_1 = require("../../../explorer/TreeNode");
const DOMAIN = 'https://www.sobiquge.com'; //改
const DOMAIN2 = 'https://m.sobiquge.com'; //添加
class ReaderDriver {
    hasChapter() {
        return true;
    }
    search(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            try {
                const res = yield got(DOMAIN2 + '/search.php?q=' + encodeURI(keyword));
                const $ = cheerio.load(res.body);
                $('.result-list .result-item.result-game-item').each(function (i, elem) {
                    const title = $(elem).find('a.result-game-item-title-link span').text();
                    const author = $(elem).find('.result-game-item-info .result-game-item-info-tag:nth-child(1) span:nth-child(2)').text();
                    const path = $(elem).find('a.result-game-item-pic-link').attr().href;
                    result.push(new TreeNode_1.TreeNode(Object.assign({}, TreeNode_1.defaultProblem, {
                        type: '.biquge',
                        name: `${title} - ${author}`,
                        isDirectory: true,
                        path
                    })));
                });
            }
            catch (error) {
                console.warn(error);
            }
            return result;
        });
    }
    getChapter(pathStr) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            try {
                const res = yield got(DOMAIN + pathStr);
                console.log(res);
                const $ = cheerio.load(res.body);
                console.log(res.body);
                $('#list dd').each(function (i, elem) {
                    const name = $(elem).find('a').text();
                    const path = $(elem).find('a').attr().href;
                    result.push(new TreeNode_1.TreeNode(Object.assign({}, TreeNode_1.defaultProblem, {
                        type: '.biquge',
                        name,
                        isDirectory: false,
                        path
                    })));
                });
            }
            catch (error) {
                console.warn(error);
            }
            return result;
        });
    }
    getContent(pathStr) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = '';
            try {
                const res = yield got(DOMAIN + pathStr);
                const $ = cheerio.load(res.body);
                const html = $('#content').html();
                result = html ? html : '';
            }
            catch (error) {
                console.warn(error);
            }
            return result;
        });
    }
}
exports.readerDriver = new ReaderDriver();
//# sourceMappingURL=index.js.map