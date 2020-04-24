const pool = require("../util/DBUtil.js")
class HistoryModel {
  //通过userAccount查询当前用户的所有历史记录；
	searchHistory(userAccount) {
		const promise = new Promise(function(resolve, reject) {
      pool.getConnection(function (err, con) {//con就是连接对象
				const sql = 'select historical_record.addtime,book.author,book.book_name,book.book_id,book.cover,book_of_chapter.chapter,book_of_chapter.chapter_id,historical_record.page,historical_record.user_account FROM book INNER JOIN book_of_chapter ON book.book_id=book_of_chapter.book_id INNER JOIN historical_record ON book.book_id=historical_record.book_id AND historical_record.chapter_id = book_of_chapter.chapter_id where historical_record.user_account= ?'
				//查询,当前错时，e为错误对象，当成功时， e的值为null, user是查询到的数据
				con.query(sql,[userAccount],function(e, data){
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
              message.hint = '查询当前用户历史记录成功'
              resolve(message);
            } else { 
              message.code = 0;
              message.data = '';
              message.hint = '当前用户的历史记录为空'
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
  //通过userAccount,bookId 查询当前用户的某一条历史记录。
  searchOneHistory(userAccount,bookId) {
		const promise = new Promise(function(resolve, reject) {
      pool.getConnection(function (err, con) {//con就是连接对象
				const sql = 'select * FROM historical_record WHERE user_account=? AND book_id=?'
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[userAccount,bookId],function(e, data){
          con.release();
          let message = {
            code: 0,
            data:''
          }
          if (!e) {//如果e不为null, 则成功
            if (JSON.stringify(data)!= '[]') {
              message.code = 1;
              message.data = data[0];
              console.log('查询单条历史记录成功');
              console.log(message);
              resolve(message);
            } else { 
              message.code = 0;
              message.data = '你还没有历史记录';
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
  deleteHistoryForBookId(userAccount,bookId) {
		const promise = new Promise(function(resolve, reject) {
      pool.getConnection(function (err, con) {//con就是连接对象
				const sql = 'DELETE  FROM historical_record WHERE user_account=? AND book_id=?'
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
              message.hint = '删除历史记录成功';
              resolve(message);
            } else { 
              message.code = 0;
              message.data = '';
              message.hint = '此条历史记录不存在，删除失败';
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
module.exports=HistoryModel;