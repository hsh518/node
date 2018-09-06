/**
* 路由配置
*/
let url = require('url')
let querystring = require('querystring')
let routers = {}
routers.postTest = require('./router/postTest')
routers.getTest = require('./router/getTest')
routers.fsTest = require('./router/fsTest')
let router = function (req, res) {
	res.writeHead(200, {'Content-Type' : 'application/json'})
	pathHandOut(req,res)
}
module.exports = router
/**
* 分发路由
*/
function pathHandOut(req, res) {
	let pathName = url.parse(req.url).pathname; 
	let paths = pathName.split('/')
	let controller = paths[1] || 'index'
	let action = paths[2] || 'index'
	let params = {}
	if (req.method === 'get') {
		let query = url.parse(req.url).query 
		query = querystring.parse(query)
		params = query
	}
	if (req.method === 'post' && req.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
		let params = req.rawBody
	}
	if (!routers[controller]) {
		res.writeHead(404)
		res.end()	
	}
	if (!routers[controller][action]) {
		res.writeHead(404)
		res.end()
	}
	routers[controller][action](req, res, params)
}