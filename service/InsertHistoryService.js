//业务处理层
const InsertHistoryModel = require("../model/InsertHistoryModel.js")
//登陆
class InsertHistoryService {
	constructor() {
	    this.insertHistoryModel = new InsertHistoryModel();
	}
  insertHistory(userAccount, bookId, chapterId,addtime) {
    let that = this;
    const p = new Promise((resolve, reject) => {
      //查询历史记录是否存在，不存在插入历史记录，存在更新历史记录
			const promise = this.insertHistoryModel.searchHistoryIsExist(userAccount,bookId);
      promise.then(function (message) {
        console.log(message)
        if (message.code == 0) {//历史记录不存在，创建历史记录
          const promise = that.insertHistoryModel.createHistory(userAccount, bookId, chapterId,addtime)
          promise.then(function (message) {
            resolve(message);
          }).catch(function (e) {
            reject(e);
          });
        }
        else { 
          const promise = that.insertHistoryModel.updateHistory(userAccount, bookId, chapterId, addtime)
          promise.then(function (message) {
            resolve(message);
          }).catch(function (e) {
            reject(e);
          });
        }
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
	}
}
module.exports=InsertHistoryService;