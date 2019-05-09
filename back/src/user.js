
exports.options = (res,queryString) => {
	res.end('user options ok:'+ queryString)
}

exports.post = (res,queryString) => {
	res.end('user post ok:'+ queryString)
}

exports.get = (res,queryString) => {
	res.end('user get ok:'+ queryString)
}