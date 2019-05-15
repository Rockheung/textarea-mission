// const { getDB } = require("../mdl");
const { signIn, signOut } = require("../mdl/session.js")


// signin
exports.post = async ({res,queryString, body, sessions, header, db}) => {
	console.log(sessions, header)
	try {
		if (sessions[header.sessionID]) {
			res.status = 200;
			res.write(JSON.stringify({status:`keep sesstion`, youAre: `${sessions[header.sessionID]}`}));
			res.end();
			return
		}
		await signIn({db,data:{...body,...header},sessions})
		res.status = 200;
		res.write(JSON.stringify({status:`session post ok: ${body.username} Sign in!`}))
		res.end()	
	} catch (e) {
		res.status = 401;
		res.write(JSON.stringify({status:e.message}));
		res.end();
	}	
}

// signout
exports.delete = ({res,queryString, body}) => {
	res.end({status:'session delete ok:'+ queryString})
}