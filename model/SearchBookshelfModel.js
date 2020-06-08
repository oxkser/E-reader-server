const pool = require("../util/DBUtil.js")
class SearchBookshelfModel {
	searchbookshelf(userAccount) {
		const promise = new Promise(function(resolve, reject) {
      pool.getConnection(function (err, con) {//con就是连接对象
        const sql = 'select book_shelf.addtime,book.author,book.book_name,book.book_id,book.cover,book_of_chapter.chapter,book_of_chapter.chapter_id,book_shelf.user_account FROM book INNER JOIN book_of_chapter ON book.book_id=book_of_chapter.book_id INNER JOIN book_shelf ON book.book_id=book_shelf.book_id AND book_shelf.chapter_id = book_of_chapter.chapter_id where book_shelf.user_account= ?';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
        con.query(sql, [userAccount], function (e, data) {
          con.release();
          let message = {
            code: 0,
            data: '',
            hint:''
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data)!= '[]') {
              message.code = 1;
              message.data = data;
              message.hint ='查询当前用户书架信息成功'
              resolve(message);
            } else { 
              message.code = 0;
              message.data = '';
              message.hint = '你的书架空空如也'
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
  //通过userAccount,bookId 查询当前用户的某一条书架信息。
  searchOneBookshelf(userAccount,bookId) {
		const promise = new Promise(function(resolve, reject) {
      pool.getConnection(function (err, con) {//con就是连接对象
				const sql = 'select * FROM book_shelf WHERE user_account=? AND book_id=?'
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[userAccount,bookId],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint:''
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data)!= '[]') {
              message.code = 1;
              message.data = data[0];
              message.hint = '该书目已经被添加到书架中了，请勿重复添加。';
              resolve(message);
            } else { 
              message.code = 0;
              message.data = '此条书架信息不存在';
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
  //通过userAccount,bookId 删除当前用户的某一条书架信息。
  deleteBookForBookId(userAccount,bookId) {
		const promise = new Promise(function(resolve, reject) {
      pool.getConnection(function (err, con) {//con就是连接对象
				const sql = 'DELETE  FROM book_shelf WHERE user_account=? AND book_id=?'
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[userAccount,bookId],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint:''
          }
          if (!e) {//如果e不为null, 则成功
            if (data.affectedRows!=0) {
              message.code = 1;
              message.data = data[0];
              message.hint = '删除书架信息成功';
              resolve(message);
            } else { 
              message.code = 0;
              message.data = '';
              message.hint = '此条书架信息不存在，删除失败';
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
module.exports=SearchBookshelfModel;
