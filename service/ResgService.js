//业务处理层
const ResgModel = require("../model/ResgModel.js")
//登陆
class ResgService {
	constructor() {
	    this.resgModel = new ResgModel();
	}
resgister(userAccount,password,userName) {
		let that=this;
		const p = new Promise((resolve, reject)=>{
			const firstp=that.resgModel.seekUser(userAccount);//检查用户是否存在
			firstp.then(function(message){
				if(message.code==-1){//账号已存在。
          resolve(message);
        } else {
          const seconp = that.resgModel.addUser(userAccount, password, userName); 
          seconp.then(function (message) {
            resolve(message);
					}).catch((e)=>{
						reject(e);
					});
				}
			}).catch((e)=>{
				reject(e);
			});
			
			
		})
		return p;
	}
}
module.exports = ResgService;
