const { getDB } = require("../mdl")
const { add: addUser } = require("../mdl/user.js")

// signup
exports.post = ({res,queryString, body}) => {
  addUser({db: getDB('webCoder'), data: body})
	res.end('user post ok:'+ queryString + JSON.stringify(body)	)
}
