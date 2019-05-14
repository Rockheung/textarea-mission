const { createHash } = require('crypto');

exports.getBody = req => {
	if (req.method === "GET") {
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
