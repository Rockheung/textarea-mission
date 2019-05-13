

exports.get = ({res,queryString, body, db}) => {
	res.end('file get ok:'+ queryString)
}

exports.post = ({res,queryString, body, db}) => {
	res.end('file post ok:'+ queryString+ body)
}

exports.put = ({res,queryString, body, db}) => {
	res.end('file put ok:'+ queryString+body)
}

exports.delete = ({res,queryString, body, db}) => {
	res.end('file delete ok:'+ queryString)
}