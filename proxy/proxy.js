const http = require('http')
const routers = require('./route')
const url = require('url')
const querystring = require('querystring')
let hostName = 'http://service.tcampus.local'


let route = function (req, res){
	let buffer = []
	let pathName = url.parse(req.url).pathname; 
	let options = {
		hostname: url.parse(hostName).hostname,
		port: 80,
		path: '/service_base' + pathName,
		method: req.method,
		headers: req.headers
	}
	let request = http.request(options, (reponse) => {
		reponse.on('data', (chunk) => {
			buffer.push(chunk)
		})
		reponse.on('end', () => {
			req.proxyBody = querystring.parse(Buffer.concat(buffer).toString())
			console.log(router, pathName)
			router.routers[pathName](req, res)
		})
	})
	request.write(JSON.stringify(req.body))
	request.end()
}

function routerController(){
	this.routers = {}
}
routerController.prototype.use = function(path, action){
	this.routers[path] = action
}
let router = new routerController()
router.use('/login/teacher', routers.teacher)

module.exports = route