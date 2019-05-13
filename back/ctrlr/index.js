const urlParse = require('url').parse,
			cookie = require('cookie');
			routes = require('./routes.js'),
			dbClient = require('../mdl'),
			{ getBody, cookieParser } = require('../lib/util.js');


const sessions = {};


module.exports = async (req,res)=>{
	
	let { method, headers, url } = req
	let { pathname, search, query } = urlParse(req.url, true);
	let { _sid } = cookie.parse(headers['cookie']);
	console.log(_sid)

	try {
		if (routes[pathname] && method === 'OPTIONS') {
			res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
			res.end('options ok')
			
		} else if (routes[pathname] && routes[pathname][method]) {
			routes[pathname][method]({
				res, 
				queryString: JSON.stringify(query),
				body: {...await getBody(req),...{sessionID: _sid}},
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