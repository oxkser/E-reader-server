const pool = require("../util/DBUtil.js")
class SearchBookModel {
	randomSearchbook(begin,pagesize,currentpage) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'select * from book limit ?,?';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[begin,pagesize],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: '',
            currentpage: '',
            pagesize:''
            
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data) != '[]') {
              message.code = 1;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '随机分页推荐查询成功';
              resolve(message);
            } else {
              message.code = 0;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '随机分页查询到的书目为空';
              resolve(message);

             }
					}else {//
						reject(e) //发出事件
					}
				});
			})
		});
		return promise;
  };
  searchBookByMark(begin,pagesize,currentpage) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'select * from book  order by mark desc limit ?,?; ';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[begin,pagesize],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data) != '[]') {
              message.code = 1;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '按评分分页查询书目成功';
              resolve(message);
            } else {
              message.code = 0;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '按评分分页查询到的书目为空';
              resolve(message)
             }
					}else {//
						reject(e) //发出事件
					}
				});
			})
		});
		return promise;
  };
  searchBookByAttention(begin,pagesize,currentpage) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'select * from book  order by attention desc limit ?,?; ';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[begin,pagesize],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data) != '[]') {
              message.code = 1;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '按热度分页查询书目成功';
              resolve(message);
            } else {
              message.code = 0;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '按热度分页查询到的书目为空';
              resolve(message);
             }
					}else {//
						reject(e) //发出事件
					}
				});
			})
		});
		return promise;
  };
  searchBookByShelftime(begin,pagesize,currentpage) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'select * from book  order by shelf_time desc limit ?,?; ';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[begin,pagesize],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data) != '[]') {
              message.code = 1;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '按上架时间分页查询书目成功';
              resolve(message);
            } else {
              message.code = 0;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '按上架时间分页查询书目为空';
              resolve(message);
             }
					}else {//
						reject(e) //发出事件
					}
				});
			})
		});
		return promise;
  }
  searchBookBySort(sort,begin,pagesize,currentpage) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'SELECT * FROM book WHERE sort_1 =? OR sort_2 =? OR sort_3 =? limit ?,?; ';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[sort,sort,sort,begin,pagesize],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data) != '[]') {
              message.code = 1;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '按类别分页查询书目成功';
              resolve(message);
            } else {
              message.code = 0;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '按类别分页查询书目为空';
              resolve(message);
             }
					}else {//
						reject(e) //发出事件
					}
				});
			})
		});
		return promise;
  }
  vagueSearchBook(str,begin,pagesize,currentpage) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
        const sql = `SELECT * FROM book WHERE book_name LIKE '%${str}%' OR author LIKE '%${str}%'limit ${begin},${pagesize};`; 
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data) != '[]') {
              message.code = 1;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '模糊分页查询书目成功';
              resolve(message);
            } else {
              message.code = 0;
              message.data = data;
              message.currentpage = currentpage;
              message.pagesize = pagesize;
              message.hint = '模糊分页查询书目为空';
              resolve(message);
             }
					}else {//
						reject(e) //发出事件
					}
				});
			})
		});
		return promise;
  }
  searchBookById(bookId) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
        const sql = `SELECT * FROM book WHERE book_id=? ;`; 
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[bookId],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data) != '[]') {
              message.code = 1;
              message.data = data[0];
              message.hint = '通过id查询书目成功';
              resolve(message);
            } else {
              message.code = 0;
              message.data = data;
              message.hint = '通过id查询书目为空';
              resolve(message);
             }
					}else {//
						reject(e) //发出事件
					}
				});
			})
		});
		return promise;
	}
}
module.exports=SearchBookModel;