const ws = require("nodejs-websocket")
let server = ws.createServer((conn) => {
	conn.on('text', (str) => {
		let data = JSON.parse(str)
		if(data.MsgType === 'register') {
			conn.USERID = data.UserId
			return false
		} 
		if(data.MsgType === 'group') {
			server.sendAll(data)
			return false
		}
		if(data.MsgType === 'one') {
			console.log(data)
			server.sendOne(data)
		}
	})
	conn.on('error', (error) => {
		// console.log(error)
	})
	conn.on('close', () => {

	})
	conn.sendText('历史消息1\n历史信息2\n历史信息3\n')
}).listen(8030)
// 发送信息给所有用户
server.sendAll = function(data) {
	server.connections.forEach(function (conn) {
        	conn.sendText(dataString(data))
    	})
}
// 发送给单一用户
server.sendOne = function(data) {
	server.connections.forEach(function (conn) {
			if(conn.USERID == data.ToId || conn.USERID == data.UserId){
				conn.sendText(dataString(data))
			}
    	})
}
// 处理消息字符串
function dataString(data) {
	let type = '群聊消息'
	let time = new Date()
	let sender = '用户'+data.UserId
	let content = data.Content
	if(data.MsgType === 'one') {
		type = '单聊消息'
	}
	return `${sender}--${time}--${type}：${content}`
}

