
exports.options = (res,queryString) => {
	res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
	res.end('user options ok:'+ queryString)
}

exports.post = (res,queryString, body) => {
	res.end('user post ok:'+ queryString + body)
}

exports.get = (res,queryString) => {
	res.end('user get ok:'+ queryString)
}