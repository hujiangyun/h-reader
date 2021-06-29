"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readerDriver = void 0;
const got = require("got");
const cheerio = require("cheerio");
const TreeNode_1 = require("../../../explorer/TreeNode");
const DOMAIN = 'https://m.qidian.com';
class ReaderDriver {
    hasChapter() {
        return true;
    }
    search(keyword) {
        return new Promise(function (resolve, reject) {
            got(DOMAIN + '/search?kw=' + encodeURI(keyword))
                .then((res) => {
                const result = [];
                const $ = cheerio.load(res.body);
                $('.book-li').each(function (i, elem) {
                    const title = $(elem).find('.book-title').text();
                    const author = ($(elem).find('.book-author').children()[0].next.data || '').replace(/[\s]/g, '');
                    const bookId = $(elem)
                        .find('.book-layout')
                        .attr()
                        .href.replace(/\/book\//g, '');
                    result.push(new TreeNode_1.TreeNode(Object.assign({}, TreeNode_1.defaultProblem, {
                        type: '.qidian',
                        name: `${title} - ${author}`,
                        isDirectory: true,
                        path: JSON.stringify({ bookId })
                    })));
                });
                resolve(result);
            })
                .catch((reason) => {
                reject(reason);
            });
        });
    }
    getChapter(pathStr) {
        const { bookId } = JSON.parse(pathStr);
        return new Promise(function (resolve, reject) {
            got(DOMAIN + '/book/' + bookId + '/catalog')
                .then((res) => {
                const result = [];
                const regEx = new RegExp('g_data.volumes = (.*?);').exec(res.body);
                if (regEx) {
                    const data = eval(regEx[1]);
                    data.forEach((e) => {
                        e.cs.forEach((cs) => {
                            result.push(new TreeNode_1.TreeNode(Object.assign({}, TreeNode_1.defaultProblem, {
                                type: '.qidian',
                                name: cs.cN,
                                isDirectory: false,
                                path: JSON.stringify({ bookUrl: DOMAIN + `/book/${bookId}/${cs.id}` })
                            })));
                        });
                    });
                }
                resolve(result);
            })
                .catch((reason) => {
                reject(reason);
            });
        });
    }
    getContent(pathStr) {
        const { bookUrl } = JSON.parse(pathStr);
        return new Promise(function (resolve, reject) {
            got(bookUrl)
                .then((res) => {
                const $ = cheerio.load(res.body);
                const txt = $('#chapterContent .read-section p')
                    .map(function (i, el) {
                    return $(el).text();
                })
                    .get()
                    .join('\r\n\r\n');
                resolve(txt);
            })
                .catch((reason) => {
                reject(reason);
            });
        });
    }
}
exports.readerDriver = new ReaderDriver();
//# sourceMappingURL=index.js.map