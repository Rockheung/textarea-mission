const { UPLOAD_DIR, fsRenamePromise } = require('../lib/util.js');
const path = require('path');
const fs = require('fs');
const assert = require('assert')


exports.get = ({res,queryString, body, header, db, sessions}) => {
	res.end(JSON.stringify({statusMsg:'file get ok:'+ queryString}))
}

exports.post = async ({res,queryString, body, header, db, sessions}) => {
	try {
		console.log(header.sessionID, sessions)
		if (!sessions.has(header.sessionID)) throw 403
		let username = sessions.get(header.sessionID)
		let userPath = path.join(UPLOAD_DIR, username)
		if (!fs.existsSync(userPath)) fs.mkdirSync(userPath, 0o775)
		
		let fsJobs = body.map(file=>fsRenamePromise(file.path, path.join(userPath,file.name)));
		
		for (const job of fsJobs) {
			try {
			  await job;
			} catch (e) {
				console.log(e.message, 'will not override')
			}
		}
		
		res.end(JSON.stringify({statusMsg:'file post ok:'}))
	} catch (e) {
		res.statusCode = e
		res.write(JSON.stringify({statusMsg:'file post failed'}))
		res.end()
	}
}

exports.put = ({res,queryString, body, header, db, sessions}) => {
	res.end(JSON.stringify({statusMsg:'file put ok:'+ queryString+body}))
}

exports.delete = ({res,queryString, body, header, db, sessions}) => {
	res.end(JSON.stringify({statusMsg:'file delete ok:'+ queryString}))
}