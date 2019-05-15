// const { getDB } = require("../mdl");
const { signIn, signOut } = require("../mdl/session.js")


// signin
exports.post = async ({res,queryString, body, sessions, header, db}) => {
	try {
		if (sessions[header.sessionID] && !body.username) {
			res.statusCode = 200;
			res.write(JSON.stringify({status:`keep session`, youAre: `${sessions[header.sessionID]}`}));
			res.end();
			return
		}
		
		let user = await signIn({db,data:{...body,...header},sessions})
		sessions[header.sessionID] = user;
		res.statusCode = 200;
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