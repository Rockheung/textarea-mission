

// signin
exports.post = (res,queryString, body) => {
	res.end('session post ok:'+ queryString + body)
}

// delete
exports.delete = (res,queryString) => {
	res.end('session delete ok:'+ queryString)
}