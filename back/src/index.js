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
	let { pathname, search, query } = urlParse(req.url, true);
	// console.log(pathname, search, query);
	// console.log(urls.user,pathname.slice(1),urls[pathname.slice(1)])
	// console.log(req.method)
	try {
		if (routes[pathname] && routes[pathname][req.method]) {
			routes[pathname][req.method](res, JSON.stringify(query))
		} else {
			throw new Error('No url or method not allowed')
		}
	} catch (e) {
		console.log('hello error',e)
		res.end('catch:', e)
	}
	res.end('fail')
}