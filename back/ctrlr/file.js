

exports.get = ({res,queryString, body, db}) => {
	res.end(JSON.stringify({statusMsg:'file get ok:'+ queryString}))
}

exports.post = ({res,queryString, body, db}) => {
	res.end(JSON.stringify({statusMsg:'file post ok:'+ queryString}))
}

exports.put = ({res,queryString, body, db}) => {
	res.end(JSON.stringify({statusMsg:'file put ok:'+ queryString+body}))
}

exports.delete = ({res,queryString, body, db}) => {
	res.end(JSON.stringify({statusMsg:'file delete ok:'+ queryString}))
}