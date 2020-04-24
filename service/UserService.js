//业务处理层
const UserModel = require("../model/UserModel.js")
//登陆
class UserService {
	constructor() {
	    this.userModel = new UserModel();
	}
  login(userAccount, password) {
		const p = new Promise((resolve, reject)=>{
			const promise = this.userModel.login(userAccount,password);
      promise.then(function (message) {
          resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
  };
  searchInfoByUseraccount(userAccount) {
		const p = new Promise((resolve, reject)=>{
			const promise = this.userModel.searchInfoByUseraccount(userAccount);
      promise.then(function (message) {
          resolve(message);
			}).catch(function(e){
				reject(e);
			});
		})
		return p;
	}
}
module.exports=UserService;