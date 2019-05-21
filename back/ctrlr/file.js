const { UPLOAD_DIR, getSid, urlCleaner, isText,
			 fsRenamePromise, fsStatPromise, fsReadDirPromise, 
			 fsReadFilePromise, fsWriteFilePromise, fsUnTarPromise, unZipAsync, unZipPromise } = require('../lib/util.js');
const path = require('path');
const fs = require('fs');
const assert = require('assert')


exports.get = async ({res,queryString, body, header, db, sessions}) => {
	try {
		if (!sessions.has(header.sessionID)) throw 403
		const username = sessions.get(header.sessionID)
		const requestedPath = path.join(UPLOAD_DIR, username, urlCleaner(JSON.parse(queryString).path))
		const fsUnit = await fsStatPromise(requestedPath)
		// console.log('fsUnit',fsUnit)
		if (fsUnit === null) {
			res.write(JSON.stringify({
				statusMsg:'file get ok',
				fileList: [],
				fileContent: null
			}))
	  } else if (fsUnit.isFile()) {
			res.write(JSON.stringify({
				statusMsg: 'file get ok',
				fileList: null,
				fileContent: isText(requestedPath) ? await fsReadFilePromise(requestedPath) : null
			}))
		} else if (fsUnit.isDirectory()) {
			res.write(JSON.stringify({
				statusMsg: 'file get ok',
				fileList: await fsReadDirPromise(requestedPath),
				fileContent: null
			}))
		} else {
			throw 500
		}
		res.end()
	} catch (e) {
		if (e instanceof Error) e=500;
		res.statusCode = e
		res.write(JSON.stringify({statusMsg:'file get failed'}))
		res.end()
	}
	
}

exports.post = async ({res,queryString, body, header, db, sessions}) => {
	try {
		if (!sessions.has(header.sessionID)) throw 403
		const username = sessions.get(header.sessionID)
		const userPath = path.join(UPLOAD_DIR, username)
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
		if (e instanceof Error) e=500;
		res.statusCode = e
		res.write(JSON.stringify({statusMsg:'file post failed'}))
		res.end()
	}
}

exports.put = async ({res,queryString, body, header, db, sessions}) => {
	try {
		if (!sessions.has(header.sessionID)) throw 403
		
		const username = sessions.get(header.sessionID)
		const requestedPath = path.join(UPLOAD_DIR, username, urlCleaner(JSON.parse(queryString).path))
		if (path.extname(requestedPath) === '.tar') {
			await fsUnTarPromise(requestedPath)
		}	else if (path.extname(requestedPath) === '.zip') {
			await unZipPromise(requestedPath)
		} else {
			await fsWriteFilePromise(requestedPath,body)
		}
		
		res.end(JSON.stringify({statusMsg:'file put ok:'}))
	} catch (e) {
		console.log(e)
		if (e instanceof Error) e=500;
		res.statusCode = e;
		res.write(JSON.stringify({statusMsg:'file put failed'}));
		res.end();
	}
}

exports.delete = ({res,queryString, body, header, db, sessions}) => {
	res.end(JSON.stringify({statusMsg:'file delete ok:'+ queryString}))
}