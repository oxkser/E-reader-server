//业务处理层
const InsertBookToBookshelfModel = require("../model/InsertBookToBookshelfModel.js");
const HistoryModel = require("../model/HistoryModel.js");
const SearchBookshelfModel = require("../model/SearchBookshelfModel.js");

class InsertBookToBookshelfService {
  constructor() {
    this.insertBookToBookshelfModel = new InsertBookToBookshelfModel();
    this.historyModel = new HistoryModel();
    this.searchBookshelfModel = new SearchBookshelfModel();
  }
  //插入书目到书架
  insertBookToBookshelf(userAccount, bookId,addtime) {
    let that = this;
    const p = new Promise((resolve, reject) => {
      //查询书架是否存在当前书目的书架信息
      const promise = this.searchBookshelfModel.searchOneBookshelf(userAccount, bookId);
      promise.then(function (message) {
        //code为0 书目信息不存在，可以插入
        if (message.code == 0) {
          const promise = that.historyModel.searchOneHistory(userAccount, bookId);
          promise.then(function (message) {
            //存在历史记录，将记录的章节,插入书架；
            if (message.code == 1) {
              let chapterId = message.data.chapter_id;
              console.log(chapterId);
              const promise = that.insertBookToBookshelfModel.insertBookToBookshelf(userAccount, bookId, chapterId,addtime);
              promise.then(function (message) {
                resolve(message);
              }).catch(function (e) {
                reject(e);
              });
              //不存在历史记录，将第一章，第一页插入书架；
            } else {
              let chapterId = '1';
              console.log(chapterId);
              const promise = that.insertBookToBookshelfModel.insertBookToBookshelf(userAccount, bookId, chapterId,addtime);
              promise.then(function (message) {
                resolve(message);
              }).catch(function (e) {
                reject(e);
              });
            }
          }).catch(function (e) {
            reject(e);
          });
        } else {
          resolve(message);
        }
      }).catch(function (e) {
        reject(e);
      });
    })
    return p;
  }
}
module.exports = InsertBookToBookshelfService;