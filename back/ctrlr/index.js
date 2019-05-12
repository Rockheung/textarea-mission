const urlParse = require('url').parse,
			routes = require('./routes.js'),
			{ getBody } = require('./util.js');


module.exports = async (req,res)=>{
	
	let { method, headers, url } = req
	let { pathname, search, query } = urlParse(req.url, true);

	// console.log(pathname, search, query);
	// console.log(urls.user,pathname.slice(1),urls[pathname.slice(1)])
	// console.log(req.method)
	try {
		if (routes[pathname] && method === 'OPTIONS') {
			res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
			res.end('options ok')
			
		} else if (routes[pathname] && routes[pathname][method]) {
			routes[pathname][method](res, JSON.stringify(query), await getBody(req))	
			
		} else {
			throw new Error('No url or method not allowed')
		}
	} catch (e) {
		console.log('hello error',e)
		res.statusCode = 500;
		res.statusMessage = e.msg
		res.end('caught error', e)
	}
	res.end('fail')
}