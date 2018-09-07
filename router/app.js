/**
 * 路由调用方法及中间件
 * @type {Array}
 */
let methods = ['get', 'post', 'delete', 'put']
let app = function () {
	this.routes = {
		all: {
			'/': []
		},
		get: {},
		post: {},
		delete: {},
		put: {}
	}
}
app.prototype.use = function (path) {
	if (typeof path === 'string') {
		if (this.routes.all[path]) {
			this.routes.all[path].push(arguments[1])
		} else {
			this.routes.all[path] = [arguments[1]]
		}
	} else {
		this.routes.all['/'].push(path)
	}

}
methods.forEach((method) => {
	app.prototype[method] = function (path, action) {
		if (this.routes[method][path]) {
			this.routes[method][path].push(action)
		} else {
			this.routes[method][path] = [action]
		}
	}
})
module.exports = app