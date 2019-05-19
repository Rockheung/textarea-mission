const urlParse = require('url').parse;
const routes = require('./routes.js');
const { getBody, cookieSetter } = require('../lib/util.js');

module.exports = async ({req,res,db,sessions})=>{
	
	let { method, headers, url } = req
	let { pathname, search, query } = urlParse(req.url, true);
  let _sid = cookieSetter(req,res)

	try {
		if (routes[pathname] && method === 'OPTIONS') {
			// 만약 CORS를 하려면, Origin에 특정 도메인을 지정하고, 클라이언트의 fetch에서 사용되는 요청에 credentials: true를 추가해야 합니다.
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