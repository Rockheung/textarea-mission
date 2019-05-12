

exports.get = (res,queryString) => {
	res.end('file get ok:'+ queryString)
}

exports.post = (res,queryString,body) => {
	res.end('file post ok:'+ queryString+ body)
}

exports.put = (res,queryString,body) => {
	res.end('file put ok:'+ queryString+body)
}

exports.delete = (res,queryString) => {
	res.end('file delete ok:'+ queryString)
}