

// signin
exports.post = ({res,queryString, body, db}) => {
	res.end('session post ok:'+ queryString + body)
}

// delete
exports.delete = ({res,queryString, body, db}) => {
	res.end('session delete ok:'+ queryString)
}