const { createHash } = require('crypto');
const cookie = require('cookie');


exports.getBody = req => {
	if (req.method === "GET" || req.method === "DELETE") {
		return null
	}
	return new Promise((resolve, reject)=> {
		let body = [];
		req
		  .on('error', err => reject(err))
			.on('data', chunk => body.push(chunk))
			.on('end', () => {
			  body = Buffer.concat(body).toString()
				resolve(JSON.parse(body))
		  })
	})
}

exports.hasher = (...strs) => {
	let shasum = createHash('sha512');
  shasum.update(`${strs.join('')}`);
  return shasum.digest('base64');
}

exports.salt = "textarea-mission"


exports.getKeysFromValue = function(_value) {
	let _keys = [];
	this.forEach((value,key)=>{
		if (_value === value) {
			_keys.push(key)
		}
	})
	return _keys;
}

exports.customGenerateId = ({req,gen}) => {
	let _hash = gen(req)
	let { _sid } = cookie.parse(req.headers['cookie'] || '');
	return _sid || this.hasher(new Date(),_hash);
}

exports.wsAuth = ({socket, next, sessions}) => {
	let { headers } = socket.request
	let { _sid } = cookie.parse(headers['cookie'] || '');
	
  if (sessions.has(_sid)) {
    return next();
  }
  return next(new Error('authentication error'));
}
