const { getDB } = require("../mdl")
const { addUser } = require("../mdl/user.js")

// signup
exports.post = ({res,queryString, body}) => {
  addUser({db: getDB(), data: body})
	res.end('user post ok:'+ queryString + JSON.stringify(body)	)
}
