// const { getDB } = require("../mdl");
const { signIn, signOut } = require("../mdl/session.js")
const cookie = require('cookie');


// signin
exports.post = async ({res,queryString, body, sessions, header, db}) => {
	try {
		if (!body.username) {
			if (sessions.has(header.sessionID)) {
				res.statusCode = 200;
				res.write(JSON.stringify({statusMsg:`keep session`, youAre: `${sessions.get(header.sessionID)}`}));
				res.end();
				return
			}
			throw new Error('Auto login failed');
		}
		
		let user = await signIn({db,data:{...body,...header},sessions})
		sessions.set(header.sessionID, user);
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
exports.delete = async ({res,queryString,sessions, header,  body}) => {
	try {
	  res.setHeader('Set-Cookie', cookie.serialize('_sid', header.sessionID, {
			expires: new Date(0),
			httpOnly: true
		}));
		if (sessions.has(header.sessionID)) {
		  sessions.delete(header.sessionID);
			res.statusCode = 200;
			res.end()
			return
		} 
		throw 204
	} catch (e) {
		res.statusCode = e;
		res.end();
	}
}