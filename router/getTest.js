/**
 * 返回请求参数
 * 
 */
exports.postparams = function (req, res, params){
	let backValue = JSON.stringify(params)
	res.end(backValue)
}