const pool = require("../util/DBUtil.js")
const JwtUtil = require('../util/jwt');//引入token验证
class UserModel {
  //根据userAccount查询用户是否存在
  login(userAccount, password) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'select * from user where user_account=?';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, user是查询到的数据
				con.query(sql, [userAccount], function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint:''
          }
          if (!e) {//e为null, 未发生错误继续。
            if (JSON.stringify(data)=='[]') {
              message.code = 0;
              message.data = '';
              message.hint = '账号不存在，请重新输入';
              resolve(message);
            } else {
              if (JSON.stringify(password) == JSON.stringify(data[0].password)) {
                let jwt = new JwtUtil(data[0].user_account);
                let token = jwt.generateToken();
                message.code = 1;
                message.data = data[0].user_account;
                message.token = token;
                message.hint = '登录成功！'
                resolve(message);
              } else { 
                message.code = 0;
                message.data = '';
                message.hint = '密码错误，请重新输入';
                resolve(message);
              }
            } 
          } else {// e不为null，发生错误
						reject(e) //发出事件
					}
				});
			})
		});
		return promise;
  }
  searchInfoByUseraccount(userAccount) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con){//con就是连接对象
				const sql = 'select user_name,user_account,avatar from user where user_account=?';
				//查询,当前错时，e为错误对象，当成功时， e的值为null, user是查询到的数据
				con.query(sql, [userAccount], function(e, data){
          con.release();
          let message = {
            code: 0,
            data: '',
            hint:''
          }
          if (!e) {//e为null, 未发生错误继续。
            if (JSON.stringify(data)=='[]') {
              message.code = 0;
              message.data = '';
              message.hint = '账号信息为空';
              resolve(message);
            } else {
              message.code = 1;
              message.data = data[0];
              message.hint = '查询用户基本信息成功';
              resolve(message);
            } 
          } else {// e不为null，发生错误
						reject(e) //发出事件
					}
				});
			})
		});
		return promise;
	}
}
module.exports=UserModel;


