// const { getDB } = require("../mdl");
const { signIn, signOut } = require("../mdl/session.js")


// signin
exports.post = async ({res,queryString, body, sessions, header, db}) => {
	try {
		await signIn({db,data:{...body,...header},sessions})
		res.write(JSON.stringify({status:`session post ok: ${body.username} Sign in!`}))
		res.end()	
	} catch (e) {
		res.statusCode = 401;
		res.write(JSON.stringify({status:e.message}));
		res.end();
	}	
}

// signout
exports.delete = ({res,queryString, body}) => {
	res.end({status:'session delete ok:'+ queryString})
}