const urlParse = require('url').parse;
const user = require('./user.js');
const static = {} // require('./static.js');

const routes = {
	'/': static,
	'/api/user': {
		OPTIONS: user.options,
		GET: user.get,
		POST: user.post
	}
}

module.exports = (req,res)=>{
	
	let { method, headers, url } = req
	let { pathname, search, query } = urlParse(req.url, true);
	let body = []
	req.on('data', chunk => {
		body.push(chunk)
	}).on (
		'end', ()=>{
			body = Buffer.concat(body).toString()
	})
	// console.log(pathname, search, query);
	// console.log(urls.user,pathname.slice(1),urls[pathname.slice(1)])
	// console.log(req.method)
	try {
		if (routes[pathname] && routes[pathname][method]) {
			routes[pathname][method](res, JSON.stringify(query), body)
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