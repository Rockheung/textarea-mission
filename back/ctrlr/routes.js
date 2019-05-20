
const static = require('./static.js'),
			user = require('./user.js'),
      session = require('./session.js'),
      file = require('./file.js'),
      ws = require('./ws.js');

module.exports = {
	// '/': {
	// 	GET: static
	// },
	'/api/user': {
		POST: user.post
	},
	'/api/session': {
		POST: session.post,
		DELETE: session.delete
	},
	'/api/file': {
		GET: file.get,
		POST: file.post,
		PUT: file.put,
		DELETE: file.delete
	}
}