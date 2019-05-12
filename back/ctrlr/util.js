
exports.getBody = req => {
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