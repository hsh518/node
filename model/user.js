const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const url = "mongodb://localhost/nodedb"
/**
 * 用户登陆注册处理
 */
mongoose.connect(url)
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let userSchema = new Schema({
		userName: String,
		passWord: String
	})
let userModel = mongoose.model('user', userSchema)
exports.login = function(req,res) {
	userModel.find({userName: req.body.userName, passWord: req.body.passWord},(error, docs) => {
		if(error) {
			resError(res, error)
			return
		}
		if (docs.length === 0) {
			resError(res, '账号或密码错误')
		}else{
			console.log(docs)
			resEnd(res, {userName: docs[0].userName})
		}
	})
}

/**
 * 成功返回
 * @param  {[type]} res  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function resEnd(res, data) {
	let resultData = {
		code: 0,
		msg: '操作成功',
		data: data
	}
	res.end(JSON.stringify(resultData))
}
/**
 * 失败返回
 * @param  {[type]} res      [description]
 * @param  {[type]} errorMsg [description]
 * @return {[type]}          [description]
 */
function resError(res, errorMsg) {
	let errorData = {
		code: -1,
		msg: errorMsg
	}
	res.end(JSON.stringify(errorMsg))
}