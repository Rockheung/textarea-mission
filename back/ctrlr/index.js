const urlParse = require('url').parse;
const cookie = require('cookie');
const routes = require('./routes.js');
const { getBody, cookieParser, hasher } = require('../lib/util.js');


module.exports = async ({req,res,db,sessions})=>{
	
	let { method, headers, url } = req
	let { pathname, search, query } = urlParse(req.url, true);
	let { _sid } = cookie.parse(headers['cookie'] || '');
	if (!_sid) {
		res.setHeader('set-cookie', cookie.serialize("_sid", hasher(new Date()), {
			httpOnly: true
		}))
	}

	try {
		if (routes[pathname] && method === 'OPTIONS') {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Method', 'GET, POST, DELETE, PUT');
			res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
			res.statusCode = 200;
			res.end('options ok')
			
		} else if (routes[pathname] && routes[pathname][method]) {
			routes[pathname][method]({
				res, 
				queryString: JSON.stringify(query),
				header: {sessionID: _sid},
				body: await getBody(req),
				db,
				sessions
			})
			
		} else {
			throw new Error('No url or method not allowed')
		}
	} catch (e) {
		console.log('caught error while handling request',e)
		res.statusCode = 404;
		res.statusMessage = e.msg
		res.end()
	}
	// res.end('fail')
}