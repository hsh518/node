let methods = ['get', 'post', 'delete', 'put']
let app = function () {
	this.routes = {
		all: [],
		get: [],
		post: [],
		delete: [],
		put: []
	}
}
app.prototype.use = function (path, action) {
	this.routes.all.push(path,action)
}
methods.forEach((method) => {
	app.prototype[method] = function (path, action) {
		this.routes[method].push([path, action])
	}
})
module.exports = app