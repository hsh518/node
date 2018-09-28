let proxy = require('../proxy/proxy')
const userModel = require('../model/user')

exports.addUser = function(req, res) {
	let backValue = JSON.stringify(req.body)
	res.end(backValue)
}
exports.deleteUser = function(req, res) {
	res.end('删除用户')
}
exports.putUser = function(req, res) {
	res.end('修改用户')
}
exports.getUser = function(req, res) {
	res.end('获取用户')
}
exports.teacher = function(req, res) {
	proxy(req, res)
}
exports.login = function(req, res) {
	userModel.login(req, res)
}