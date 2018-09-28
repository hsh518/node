exports.teacher = function (req, res) {
	res.end(JSON.stringify(req.proxyBody))
}