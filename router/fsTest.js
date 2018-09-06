let formidable = require('formidable')
exports.uploadFs = function (req, res) {
	let form = formidable.IncomingForm()
	form.uploadDir = './fs'
	form.encoding = 'utf-8'
	form.keepExtensions = true
	form.parse(req, (err, fields, files) => {
		if (err) {
			res.end('上传失败')
		}
		res.end('上传成功')
	})
	
} 