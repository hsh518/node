/**
* 路由配置
*/
const fs = require('fs')
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
	console.log(pathName);
	if(pathName.split('/')[1] === 'assets') {
		console.log('获取文件')
		getAssets(pathName,res)
		return false
	}
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

/**
 * 静态文件获取
 * @return {[type]} [description]
 */
function getAssets(path,res) {
	let type = path.split('.')[1]
	path = '.' + path
	fs.readFile(path, (error, data) => {
		if(error) {
			return false
		} else {
			res.writeHead(200,{'Content-type':"text/"+type})
			res.end(data)
		}
	});
}
