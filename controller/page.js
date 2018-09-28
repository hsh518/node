const fs = require('fs')

exports.login = function(req, res) {
	fs.readFile('./view/login.html','utf-8',(err, data) => {
		if(err) {
			res.end('读取文件错误' + err)
		}
		res.writeHead(200,{'Content-Type':'text/html'})
		res.end(data)
	})
}

exports.play = function(req, res) {
	fs.readFile('./view/play.html','utf-8',(err, data) => {
		if(err) {
			res.end('读取文件错误' + err)
		}
		res.writeHead(200,{'Content-Type':'text/html'})
		res.end(data)
	})
}