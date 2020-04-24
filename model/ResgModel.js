const pool = require("../util/DBUtil.js")
class ResgModel {
	//添加用户数据到数据库,注册用户
  addUser(userAccount, password, userName) {
    let avatar= 'https://gw.alicdn.com/i3/6000000007643/TB2c3h2r3xlpuFjy0FoXXa.lXXa_!!0-mytaobao.jpg_.webp?tdsourcetag=s_pctim_aiomsg'
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con) { //con就是连接对象
				const sql = "INSERT INTO user (user_account, password,user_name,avatar)VALUES (?,?,?,?)";
				//查询,当前错时，e为错误对象，当成功时， e的值为null, user是查询到的数据
        con.query(sql, [userAccount, password, userName,avatar], function (e, data) {
          con.release();
          let message = {
            code: 0,
            data: '',
            hint: ''
          }
          if (!e) { //如果e不为null, 则成功
            message.code = 1;
            message.data = data;
            message.hint = '注册成功，请登录'
            resolve(message);
					} else { //
						reject(err) //发出事件
					}
				});
			})
		});
		return promise;
	}
//查找用户是否存在
	seekUser(userAccount) {
		const promise = new Promise(function(resolve, reject) {
			pool.getConnection(function(err, con) { //con就是连接对象
				const sql = "select * from user where user_account=?";
				//查询,当前错时，e为错误对象，当成功时， e的值为null, user是查询到的数据
        con.query(sql, [userAccount], function (e, data) {
          con.release();
          let message = {
            code: 0,
            data: '',
            hint:''
          }
          if (!e) { //如果e不为null, 则成功
            if (JSON.stringify(data)!='[]') {
              message.code = -1;
              message.hint = '该用户已存在，请重新输入'
              console.log(message);
              resolve(message);
            } else { 
              message.code = 0;

              resolve(message);
            }
					} else { //
						reject(err) //发出事件
					}
				});
			})
		});
		return promise;
	}
}
module.exports = ResgModel;
