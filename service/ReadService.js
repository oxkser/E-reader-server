//业务处理层
const ReadModel = require("../model/ReadModel.js")
//登陆
class ReadService {
	constructor() {
	    this.readModel = new ReadModel();
	}
  read(bookId,chapterId) {
		const p = new Promise((resolve, reject)=>{
			const promise = this.readModel.read(bookId,chapterId);
      promise.then(function (message) {
          resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  };
  searchChapterTitle(bookId) {
		const p = new Promise((resolve, reject)=>{
			const promise = this.readModel.searchChapterTitle(bookId);
      promise.then(function (message) {
          resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  };
}
module.exports=ReadService;