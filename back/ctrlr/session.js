const { getDB } = require("../mdl");
const { signIn, signOut } = require("../mdl/session.js")


// signin
exports.post = async ({res,queryString, body, sessions}) => {
	// await signIn({db:getDB(),data:body,sessions})
	// res.setHeader('Set-Cookie', '_sid=ninja')
	res.end('session post ok: You Signin!'+ queryString)
}

// signout
exports.delete = ({res,queryString, body}) => {
	res.end('session delete ok:'+ queryString)
}