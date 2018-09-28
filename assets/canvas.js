/**
 * 实例函数
 * @param  {[type]} cav       [id]
 * @param  {[type]} cellWidth [网格宽度]
 */
function canvas (id,cellWidth) {
		this.c = document.getElementById(id).getContext('2d')
		this.w = cellWidth,
		this.olddata = []
	}
/**
 * 搭建网格
 * @return {[type]} [description]
 */
canvas.prototype.cell = function() {
	console.log('绘制cell')
	x = this.c.canvas.clientWidth
	y = this.c.canvas.clientHeight
	let xLen = x/this.w
	let yLen = y/this.w
	this.c.beginPath()
	this.c.lineWidth = 0.25
	this.c.strokeStyle = 'red'
	for(let i=0; i<xLen; i++) {
		this.c.moveTo(i*this.w, 0)
		this.c.lineTo(i*this.w, y)
		
	}
	for (let i = 0; i < yLen; i++) {
		this.c.moveTo(0, i*this.w)
		this.c.lineTo(x, i*this.w)
	}
	this.c.stroke()
}
/**
 * 移动 坐标变化
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
canvas.prototype.move = function(data){
	// 避免无效的重绘
	if(JSON.stringify(data) === JSON.stringify(this.olddata)) {
		return false
	}
	// 部分重绘
	if (this.olddata.length !== 0){
		this.c.strokeStyle = 'red'
		this.c.lineWidth = 0.4
		this.c.fillStyle = '#000'
		this.olddata.forEach(item => {
			item.forEach(item => {
				this.c.fillRect(item[0],item[1],this.w,this.w)
				this.c.strokeRect(item[0],item[1],this.w,this.w)
			})
		})
	}
	this.olddata = data
	this.c.fillStyle = '#fff'
	data.forEach(item => {
			item.forEach(item => {
				this.c.fillRect(item[0],item[1],this.w,this.w)
			})
		})
}