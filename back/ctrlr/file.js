const { UPLOAD_DIR, fsRenamePromise, getSid, fsStatPromise, fsReadDirPromise } = require('../lib/util.js');
const path = require('path');
const fs = require('fs');
const assert = require('assert')


exports.get = async ({res,queryString, body, header, db, sessions}) => {
	try {
		if (!sessions.has(header.sessionID)) throw 403
		const username = sessions.get(header.sessionID)
		const requestedPath = path.join(UPLOAD_DIR, username, JSON.parse(queryString).path)
		const fsUnit = await fsStatPromise(requestedPath)
		if (fsUnit === null) {
			res.write(JSON.stringify({
				statusMsg:'file get ok',
				fileList: [],
				fileContent: null
			}))
	  } else if (fsUnit.isFile()) {
			res.write(JSON.stringify({
				statusMsg:'file get ok',
				fileList:null,
				fileContent: null
			}))
		} else if (fsUnit.isDirectory()) {
			res.write(JSON.stringify({
				statusMsg:'file get ok',
				fileList: await fsReadDirPromise(requestedPath),
				fileContent: null
			}))
		} else {
			throw 500
		}
		res.end()
	} catch (e) {
		res.statusCode = e
		res.write(JSON.stringify({statusMsg:'file get failed'}))
		res.end()
	}
	
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