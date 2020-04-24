const multer = require('multer');//需要下载
const path = require('path'); //不需要下载

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
	//设置上传文件的存放目录
    cb(null, path.resolve(__dirname+'/public/uploads'));
  },
  filename: function (req, file, cb) {
	//设置上传文件的文件名字--(1970到当前的毫秒.后缀名)
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage: storage});

module.exports=upload;