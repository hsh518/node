const url = require('url')
const querystring = require('querystring')
module.exports = function (req, res, next) {
	let headerStr = req.headers['content-type'] || ''
	headerStr = headerStr.split(';')[0]
	if(headerStr === 'application/x-www-form-urlencoded') {
		let buffers = []
		req.on('data', (chunk) => {
			buffers.push(chunk)
		})
		req.on('end', (chunk) => {
			req.body = querystring.parse(Buffer.concat(buffers).toString())
			next()
		})
	} else {
		req.query = url.parse(req.url, true).query
		next()
	}
}