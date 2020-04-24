//业务处理层
const SearchBookshelfModel = require("../model/SearchBookshelfModel.js")

class SearchBookshelfService {
	constructor() {
	    this.searchBookshelfModel = new SearchBookshelfModel();
	}
	searchbookshelf(userAccount) {
		const p = new Promise((resolve, reject)=>{
			const promise = this.searchBookshelfModel.searchbookshelf(userAccount);
			promise.then(function(message){
				resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  }
  deleteBookForBookId(userAccount,bookId) {
		const p = new Promise((resolve, reject)=>{
			const promise = this.searchBookshelfModel.deleteBookForBookId(userAccount,bookId);
			promise.then(function(message){
				resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
	}
}
module.exports=SearchBookshelfService;