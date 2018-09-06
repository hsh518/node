/**
* 路由配置
*/
let url = require('url')
let querystring = require('querystring')
let routes =require('./router/routes')
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
	let noMethod = true
	console.log(routes);
	for ( let item of routes[req.method.toLowerCase()]) {
		console.log(item);
		if (item[0] === pathName) {
			noMethod = false
			item[1](req, res)
			break
		}
	}
	if (noMethod) {
		for ( let item of routes.all) {
			if (item[0] === pathName) {
				noMethod = false
				item[1](req, res)
				break
			}
		}
		if (noMethod) {
			res.writeHead(404)
			res.end('404 not found')
		}
	}
}