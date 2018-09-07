/**
* 路由配置
*/
let url = require('url')
let querystring = require('querystring')
let routes =require('./router/routes')
let router = function (req, res) {
	console.log('接受请求');
	res.writeHead(200, {'Content-Type' : 'application/json'})
	pathHandOut(req,res)
}
module.exports = router
/**
* 分发路由
*/
function pathHandOut(req, res) {
	let pathName = url.parse(req.url).pathname; 
	let noMethod = true
	let reqPath = routes[req.method.toLowerCase()][pathName]
	let stack = routes.all['/']
	if (reqPath) {
		noMethod = false
		stack = stack.concat(reqPath)
	}
	if (noMethod) {
		if (routes.all[pathName]) {
			noMethod = false
			stack = stack.concat(routes.all[pathName])
		}
	}
	if (noMethod) {
		res.writeHead(404)
		res.end('404 not found')
	} else {
		middleware(req, res, stack)
	}
}
/**
 * 中间件
 * @param  {[array]} stack [中间件数组]
 */
function middleware(req, res, stack) {
	function next() {
		let action = stack.shift()
		if (action) {
			action(req, res, next)
		}
	}
	next()
}