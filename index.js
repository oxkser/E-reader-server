const express = require('express'); //需要下载
const path = require('path'); //不需要下载
const app = express();
const Base64 = require('js-base64').Base64
const JwtUtil = require('./util/jwt');//引入token验证
app.use(express.static(__dirname + '/public')); //静态资源根目录
///解决post请求在body里拿不到参数的问题 
const bodyParser = require("body-parser"); //被包含在express中，即下载了express就可以了
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
//cookie
var cookieParser = require('cookie-parser'); //需要下载
app.use(cookieParser());
//用于文件上传
const upload = require("./multerUtil.js")

//过滤器, 
app.use( function (req, res, next) {
  //设置跨域时，客户端域名
	res.setHeader("Access-Control-Allow-Origin", "*");
	//设置对cookie的支持
	res.setHeader("Access-Control-Allow-Credentials", true);
  // next(); //往下走
  if (req.url != '/api/login' &&
    req.url != '/api/resgister' &&
    req.url != '/api/randomsearchbook' &&
    req.url != '/api/searchbookbymark' &&
    req.url != '/api/searchbookbyattention' &&
    req.url != '/api/searchbookbyshelftime' &&
    req.url != '/api/searchbookbysort' &&
    req.url != '/api/vaguesearchbook' &&
    req.url != '/api/read' &&
    req.url != '/api/searchchaptertitle' &&
    req.url != '/api/searchbookbyid') {
    let token = req.headers.authorization;
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
        res.send({status: 403, msg: '登录已过期,请重新登录'});
    } else {
        next();
    }
} else {
    next();
}
})
const pool = require("./util/DBUtil.js")
// 测试  
app.get('/a', function (req, res) {
  pool.getConnection(function (err, con) {
    const sql = 'select * from user';
    con.query(sql, function (e, data) {
      con.release();
      res.json(data);
    });
  });
});
//账号登录
app.post("/api/login", function(req, res) {
	const UserService = require("./service/UserService.js");
  const userService = new UserService();
	let userAccount = Base64.decode(req.body.userAccount) 
  let password = Base64.decode(req.body.password);
	const p = userService.login(userAccount, password);
	p.then((message) => { //成功 user是用户数组
    if (message.code == 1) {
      res.json(message);
    } else { 
      res.json(message);
    }
	}).catch((e) => { //失败
    res.json('失败');
	});
})
//退出登录
app.post("/api/logout", function(req, res) {
	// res.clearCookie('userAccount');
	res.json("退出成功")
})
//注册
app.post("/api/resgister", function(req, res) {
	const ResgService = require("./service/ResgService.js");
	const resgService = new ResgService();
	let userAccount = Base64.decode(req.body.userAccount);
	let password = Base64.decode(req.body.password);
	let userName = req.body.userName;
	const p = resgService.resgister(userAccount, password,userName);
	p.then((message) => { //成功 user是用户数组
			res.json(message);
  }).catch((e) => { //失败
    console.log(e)
    res.json('失败');
	});
})
//根据userAccount查询基本信息。
app.post("/api/searchinfobyuseraccount", function(req, res) {
	const UserService = require("./service/UserService.js");
	const userService = new UserService();
	let userAccount = req.body.userAccount; 
	const p = userService.searchInfoByUseraccount(userAccount);
	p.then((message) => {
    res.json(message);
	
	}).catch((e) => { //失败
    console.log(e)
    res.json('失败');
	});
})
//查询当前用户历史记录
app.post("/api/searchhistory", function(req, res){
	const HistoryService = require("./service/HistoryService.js");
  const historyService = new HistoryService();
  let userAccount = req.body.userAccount;
	const p = historyService.searchHistory(userAccount);
	p.then((message) => { 
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败
    console.log(e);
    res.json('失败');
	});
})
//插入&更新历史记录；
app.post("/api/insertHistory", function(req, res){
	const InsertHistoryService = require("./service/InsertHistoryService.js");
	const insertHistoryService = new InsertHistoryService();
  let userAccount = req.body.userAccount;
  let bookId = req.body.bookId;
  let chapterId = req.body.chapterId;
  let addtime = new Date().getTime();
	const p = insertHistoryService.insertHistory(userAccount,bookId,chapterId,addtime);
	p.then((message) => { 
		if (message) {
			res.json(message); 
		}
	}).catch((e) => { //失败
    res.json(e);
	});
})
//删除一条历史记录
app.post("/api/deletehistoryforbookid", function(req, res){
	const HistoryService = require("./service/HistoryService.js");
	const historyService = new HistoryService();
  let userAccount = req.body.userAccount;
  let bookId= req.body.bookId
	const p = historyService.deleteHistoryForBookId(userAccount,bookId);
	p.then((message) => { //
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败
    res.json(e);
	});
})
//查询当前用户的书架信息
app.post("/api/searchbookshelf", function(req, res){
	const SearchBookshelfService = require("./service/SearchBookshelfService.js");
	const searchbookshelfService = new SearchBookshelfService();
	let userAccount = req.body.userAccount;
	const p = searchbookshelfService.searchbookshelf(userAccount);
	p.then((message) => { //
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败
    res.json(e);
	});
})
//删除书架的一条记录
app.post("/api/deletebookforbookid", function(req, res){
	const SearchBookshelfService = require("./service/SearchBookshelfService.js");
	const searchbookshelfService = new SearchBookshelfService();
  let userAccount = req.body.userAccount;
  let bookId= req.body.bookId
	const p = searchbookshelfService.deleteBookForBookId(userAccount,bookId);
	p.then((message) => { //
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败
    res.json(e);
	});
})
//添加书目到书架
app.post("/api/insertbooktobookshelf", function(req, res){
	const InsertBookToBookshelfService = require("./service/InsertBookToBookshelfService.js");
	const insertBookToBookshelfService = new InsertBookToBookshelfService();
  let userAccount = req.body.userAccount;
  let bookId = req.body.bookId;
  let addtime = new Date().getTime()
	const p = insertBookToBookshelfService.insertBookToBookshelf(userAccount,bookId,addtime);
	p.then((message) => { 
		if (message) {
			res.json(message); 
		}
	}).catch((e) => { //失败
    console.log(e);
    res.json(e);
	});
})
//随机推荐书目分页列表
app.post("/api/randomsearchbook", function(req, res){
	const SearchBookService = require("./service/SearchBookService.js");
  const searchbookService = new SearchBookService();
  let currentpage = req.body.currentpage;
	const p = searchbookService.randomSearchbook(currentpage);
	p.then((message) => { //
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败
    res.json(e);
	});
})
//通过评分降序分页查询书目
app.post("/api/searchbookbymark", function(req, res){
	const SearchBookService = require("./service/SearchBookService.js");
  const searchbookService = new SearchBookService();
  let currentpage = req.body.currentpage;
	const p = searchbookService.searchBookByMark(currentpage);
	p.then((message) => { 
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败 
    res.json(e);
	});
})
//通过热度降序分页查询书目
app.post("/api/searchbookbyattention", function(req, res){
	const SearchBookService = require("./service/SearchBookService.js");
  const searchbookService = new SearchBookService();
  let currentpage = req.body.currentpage;
	const p = searchbookService.searchBookByAttention(currentpage);
	p.then((message) => { 
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败 
    res.json(e);
	});
})
//通过上架时间降序分页查询书目
app.post("/api/searchbookbyshelftime", function(req, res){
	const SearchBookService = require("./service/SearchBookService.js");
  const searchbookService = new SearchBookService();
  let currentpage = req.body.currentpage;
	const p = searchbookService.searchBookByShelftime(currentpage);
	p.then((message) => { 
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败 
    res.json(e);
	});
})
//通过类别分页查询书目列表
app.post("/api/searchbookbysort", function(req, res){
	const SearchBookService = require("./service/SearchBookService.js");
  const searchbookService = new SearchBookService();
  let sort = req.body.sort;
  let currentpage = req.body.currentpage;
	const p = searchbookService.searchBookBySort(sort,currentpage);
	p.then((message) => { 
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败 
    res.json(e);
	});
})
//模糊查询
app.post("/api/vaguesearchbook", function(req, res){
	const SearchBookService = require("./service/SearchBookService.js");
  const searchbookService = new SearchBookService();
  let str = req.body.str;
  let currentpage = req.body.currentpage;
	const p = searchbookService.vagueSearchBook(str,currentpage);
	p.then((message) => { 
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败 
    res.json(e);
	});
})
//通过id查询书目的基本信息
app.post("/api/searchbookbyid", function(req, res){
	const SearchBookService = require("./service/SearchBookService.js");
  const searchbookService = new SearchBookService();
  let bookId = req.body.bookId;
	const p = searchbookService.searchBookById(bookId);
	p.then((message) => { 
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败 
    res.json(e);
	});
})
//翻页阅读
app.post("/api/read", function(req, res){
	const ReadService = require("./service/ReadService.js");
  const readService = new ReadService();
  let bookId = req.body.bookId;
  let chapterId = req.body.chapterId;
	const p = readService.read(bookId,chapterId);
	p.then((message) => { 
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败 
    res.json(e);
	});
})
//查询章节目录
app.post("/api/searchchaptertitle", function(req, res){
	const ReadService = require("./service/ReadService.js");
  const readService = new ReadService();
  let bookId = req.body.bookId;
	const p = readService.searchChapterTitle(bookId);
	p.then((message) => { 
		if (message) {
			res.json(message);
		}
	}).catch((e) => { //失败 
    res.json(e);
	});
})
app.listen(9000, function() {
	console.log(" 电子阅读器服务器监听端口9000 ！");
});
