const ws = require("nodejs-websocket")
let room = []
let cavas = {
	w: 5,
	x: 1000,
	y: 600
}
let server = ws.createServer((conn) => {
	console.log('ws连接')
	let player = new snake
	room.push(player.coords)
	timer = player.move()
	conn.on('text', (str) => {
		let data = JSON.parse(str)
		console.log(data)
		if(data.type === 'command'){
			player[data.event]()
		}
	})
	conn.on('error', (error) => {
		// console.log(error)
	})
	conn.on('close', () => {
		// 退出后清除
		clearInterval(player.timer)
	})
	conn.sendText(JSON.stringify(room))
}).listen(8020)
// 发送信息给所有用户
server.sendAll = function(data) {
	server.connections.forEach(function (conn) {
        	conn.sendText(JSON.stringify(data))
    	})
}
/**
 * 构造蛇对象
 * @return {[type]} [description]
 */
function snake() {
	this.len = 5,
	this.speed = 20
	let x = parseInt(Math.random()*200)*cavas.w
	let y = parseInt(Math.random()*120)*cavas.w
	this.coords = [[x,y]]
	this.timer = null
}
/**
 * 移动方法
 */
snake.prototype.move = function() {
 	this.timer = setInterval(() => {
		if(this.coords[0][0]<cavas.x){
			this.coords[0][0] += cavas.w
		} else {
			this.coords[0][0] = 0
		}
		server.sendAll(room)
	}, this.speed)
}
/**
 * 指令公共
 * @return {[type]} [description]
 */
snake.prototype.command = function(callback) {
	clearInterval(this.timer)
	this.timer = setInterval(() => {
		callback()
		server.sendAll(room)
	}, this.speed)
}
/**
 * 右指令
 */
snake.prototype.right = function() {
	this.command(() => {
		if(this.coords[0][0]<cavas.x){
			this.coords[0][0] += cavas.w
		} else {
			this.coords[0][0] = 0
		}
	})
}
/**
 * 左指令
 */
snake.prototype.left = function() {
	this.command(() => {
		if(this.coords[0][0]>0){
			this.coords[0][0] -=cavas.w
		} else {
			this.coords[0][0] = cavas.x
		}
	})
}
/**
 * 上指令
 */
snake.prototype.up = function() {
	console.log('up')
	this.command(() => {
		console.log('timer')
		if(this.coords[0][1]>0){
			this.coords[0][1] -=cavas.w
		}else{
			this.coords[0][1] = cavas.x
		}
	})
}
/**
 * 下指令
 */
snake.prototype.down = function() {
	this.command(() => {
		if(this.coords[0][1]<cavas.y){
			this.coords[0][1] +=cavas.w
		}else{
			this.coords[0][1] = 0
		}
	})
}


