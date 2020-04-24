const pool = require("../util/DBUtil.js")
class InsertHistoryModel {
	//根据userAccount和bookId 查询历史记录是否存在
	searchHistoryIsExist(userAccount,bookId) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'select * from historical_record  where user_account=? AND book_id=? ';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, date是查询到的数据
				con.query(sql,[userAccount,bookId],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint:''
          }
          if (!e) {
            if (JSON.stringify(data)=='[]') {//不存在当前历史记录，插入历史记录；
              message.code = 0;
              message.data = data;
              message.hint ='历史记录不存在'
              resolve(message);
            } else {//历史记录存在，更新历史记录
              message.code = 1;
              message.data = data;
              message.hint = '历史记录存在'
              resolve(message);
            }
					}else {
						reject(err) 
					}
				});
			})
		});
		return promise;
  }
  //新建一条历史记录
  createHistory(userAccount,bookId,chapterId,addtime) {
		const promise = new Promise(function(resolve, reject) {
      pool.getConnection(function (err, con) {//con就是连接对象
				const sql = 'INSERT INTO historical_record (user_account,book_id,chapter_id,addtime)VALUES (?,?,?,?) ';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[userAccount,bookId,chapterId,addtime],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
          if (!e) {
            message.code = 1;
            message.data = data;
            message.hint = '历史记录插入成功';
            resolve(message);
            
					}else {
						reject(err) 
					}
				});
			})
		});
		return promise;
  }
  //更新历史记录
  updateHistory(userAccount,bookId,chapterId,addtime) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'UPDATE historical_record SET chapter_id = ?, addtime= ?  WHERE user_account =? AND book_id=? ';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, data是查询到的数据
				con.query(sql,[chapterId,addtime,userAccount,bookId],function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
          if (!e) {
            message.code = 1;
            message.data = data;
            message.hint = '历史记录更新成功';
            resolve(message);
					}else {
						reject(err) 
					}
				});
			})
		});
		return promise;
	}
}
module.exports=InsertHistoryModel;