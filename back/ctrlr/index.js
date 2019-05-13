const urlParse = require('url').parse,
			routes = require('./routes.js'),
			dbClient = require('../mdl'),
			{ getBody } = require('./util.js');


module.exports = async (req,res)=>{
	
	let { method, headers, url } = req
	let { pathname, search, query } = urlParse(req.url, true);

	try {
		if (routes[pathname] && method === 'OPTIONS') {
			res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
			res.end('options ok')
			
		} else if (routes[pathname] && routes[pathname][method]) {
			routes[pathname][method]({
				res, 
				queryString: JSON.stringify(query),
				body: await getBody(req)
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
	res.end('fail')
}