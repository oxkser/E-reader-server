const pool = require("../util/DBUtil.js")
class InsertBookToBookshelfModel {

	insertBookToBookshelf(userAccount,bookId,chapterId,addtime) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'INSERT INTO book_shelf (user_account, book_id,chapter_id,addtime)VALUES (?,?,?,?)';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, user是查询到的数据
				con.query(sql,[userAccount,bookId,chapterId,addtime],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
					if(!e) {//如果e不为null, 则成功
            message.code = 1;
            message.data = data;
            message.hint = '添加当前书目到书架成功'
            resolve(message);
					}else {
            reject(e) 
            console.log(e);
					}
				});
			})
		});
		return promise;
	}
}
module.exports=InsertBookToBookshelfModel;