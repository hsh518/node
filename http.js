/**
* 创建服务器
*/
let http = require('http')
let router = require('./router')
http.createServer((req, res) => {
	router(req, res)
}).listen(4000, '127.0.0.1')
console.log('Server runing at http://127.0.0.1:4000')