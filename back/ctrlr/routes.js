
const static = require('./static.js'),
			user = require('./user.js'),
      session = require('./session.js'),
      file = require('./file.js'),
      ws = require('./ws.js');

module.exports = {
	// '/': {
	// 	GET: static
	// },
	'/api/dev': {
		GET: ({res, header})=>{
			console.log(header);
			
			// res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
			res.write(JSON.stringify({statusMsg:'ok'}));
			res.end();
		},
		POST: ({res, header})=>{
			console.log(header);
			
			// res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
			res.write(JSON.stringify({statusMsg:'ok'}));
			res.end();
		}
	},
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