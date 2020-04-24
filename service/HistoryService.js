//业务处理层
const HistoryModel = require("../model/HistoryModel.js")
//登陆
class HistoryService {
	constructor() {
	    this.historyModel = new HistoryModel();
	}
	searchHistory(userAccount) {
		const p = new Promise((resolve, reject)=>{
			const promise = this.historyModel.searchHistory(userAccount);
			promise.then(function(message){
				resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  }
  deleteHistoryForBookId(userAccount,bookId) {
		const p = new Promise((resolve, reject)=>{
			const promise = this.historyModel.deleteHistoryForBookId(userAccount,bookId);
			promise.then(function(message){
				resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
	}
}
module.exports=HistoryService;