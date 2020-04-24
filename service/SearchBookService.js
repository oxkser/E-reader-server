const SearchBookModel = require("../model/SearchBookModel.js")

class SearchBookService {
	constructor() {
    this.searchBookModel = new SearchBookModel();
    this.pagesize = 8;//每页显示条数
	}
	randomSearchbook(currentpage) {
    const begin = (currentpage-1)*this.pagesize;
		const p = new Promise((resolve, reject)=>{
			const promise = this.searchBookModel.randomSearchbook(begin,this.pagesize,currentpage);
			promise.then(function(message){
				resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  };
  searchBookByMark(currentpage) {
    const begin = (currentpage - 1) * this.pagesize;
		const p = new Promise((resolve, reject)=>{
			const promise = this.searchBookModel.searchBookByMark(begin,this.pagesize,currentpage);
			promise.then(function(message){
				resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  };
  searchBookByAttention(currentpage) {
    const begin = (currentpage-1)*this.pagesize;
		const p = new Promise((resolve, reject)=>{
			const promise = this.searchBookModel.searchBookByAttention(begin,this.pagesize,currentpage);
			promise.then(function(message){
				resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  };
  searchBookByShelftime(currentpage) {
    const begin = (currentpage-1)*this.pagesize;
		const p = new Promise((resolve, reject)=>{
			const promise = this.searchBookModel.searchBookByShelftime(begin,this.pagesize,currentpage);
			promise.then(function(message){
				resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  };
  searchBookBySort(sort, currentpage) {   
    const begin = (currentpage-1)*this.pagesize;
    const p = new Promise((resolve, reject) => {
      if (sort === '全部分类') { 
        const promise = this.searchBookModel.randomSearchbook(begin,this.pagesize,currentpage);
			  promise.then(function(message){
				  resolve(message);
			  }).catch(function(e){
				  reject(e);
			  });
      }
      else {
        const promise = this.searchBookModel.searchBookBySort(sort, begin, this.pagesize, currentpage);
        promise.then(function (message) {
          resolve(message);
        }).catch(function (e) {
          reject(e);
        });
      }
		})
		return p;
  }
  vagueSearchBook(str, currentpage) {   
    const begin = (currentpage-1)*this.pagesize;
		const p = new Promise((resolve, reject)=>{
			const promise = this.searchBookModel.vagueSearchBook(str,begin,this.pagesize,currentpage);
			promise.then(function(message){
				resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  }
  searchBookById(bookId) {   
    const p = new Promise((resolve, reject)=>{
      const promise = this.searchBookModel.searchBookById(bookId);
      promise.then(function(message){
        resolve(message);
      }).catch(function(e){
        reject(e);
      });
    })
    return p;
  }
}

module.exports=SearchBookService;