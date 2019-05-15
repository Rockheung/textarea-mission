// const { getDB } = require("../mdl");
const { signIn, signOut } = require("../mdl/session.js")


// signin
exports.post = async ({res,queryString, body, sessions, header, db}) => {
	try {
		if (!body.username) {
			if (sessions[header.sessionID]) {
				res.statusCode = 200;
				res.write(JSON.stringify({statusMsg:`keep session`, youAre: `${sessions[header.sessionID]}`}));
				res.end();
				return
			}
			throw new Error('Auto login failed')
			
		}
		
		let user = await signIn({db,data:{...body,...header},sessions})
		sessions[header.sessionID] = user;
		res.statusCode = 200;
		res.write(JSON.stringify({statusMsg:`session post ok: ${body.username} Sign in!`}))
		res.end()	
		
	} catch (e) {
		res.statusCode = 401;
		res.write(JSON.stringify({statusMsg:e.message}));
		res.end();
	}	
}

// signout
exports.delete = ({res,queryString, body}) => {
	res.end({statusMsg:'session delete ok:'+ queryString})
}