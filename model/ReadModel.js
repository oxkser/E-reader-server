const pool = require("../util/DBUtil.js")
class ReadModel {
  //根据书目id和chapterid阅读
	read(bookId,chapterId) {
		const promise = new Promise(function(resolve, reject) {
      pool.getConnection(function (err, con) {//con就是连接对象
				const sql = 'SELECT book.book_name, book_of_chapter.chapter, book_of_chapter.chapter_id, book_of_chapter.content FROM book INNER JOIN book_of_chapter ON book.book_id = book_of_chapter.book_id WHERE book_of_chapter.book_id=? AND book_of_chapter.chapter_id=?'
				//查询,当前错时，e为错误对象，当成功时， e的值为null, user是查询到的数据
				con.query(sql,[bookId,chapterId],function(e, data){
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
              message.hint = '阅读成功'
              resolve(message);
            } else { 
              message.code = 0;
              message.data = '';
              message.hint = '阅读内容为空'
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
  //查询章节目录
  searchChapterTitle(bookId) {
		const promise = new Promise(function(resolve, reject) {
      pool.getConnection(function (err, con) {//con就是连接对象
				const sql = 'select chapter FROM book_of_chapter WHERE book_id=?'
				//查询,当前错时，e为错误对象，当成功时， e的值为null, user是查询到的数据
				con.query(sql,[bookId],function(e, data){
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
              message.hint = '查询章节目录成功'
              resolve(message);
            } else { 
              message.code = 0;
              message.data = '';
              message.hint = '查询章节目录为空'
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
module.exports=ReadModel;