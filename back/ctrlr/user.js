const { getDB } = require("../mdl")
const { addUser } = require("../mdl/user.js")

// signup
exports.post = ({res,queryString, body, header}) => {
  addUser({db: getDB(), data: {...body, ...header}})
	res.end('user post ok:'+ queryString + JSON.stringify(body)	)
}
