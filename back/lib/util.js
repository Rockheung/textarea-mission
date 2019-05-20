const path = require('path');
const fs = require('fs');
const { createHash } = require('crypto');
const cookie = require('cookie');
const formidable = require('formidable');

const getFiles = (err, fields, files) => {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    }

const UPLOAD_DIR = path.join(path.dirname(process.cwd()),'upload');
if (!fs.existsSync(UPLOAD_DIR)) {
	fs.mkdirSync(UPLOAD_DIR, 0o775)
}

exports.UPLOAD_DIR = UPLOAD_DIR

exports.getSid = req => cookie.parse(req.headers['cookie'] || '')['_sid'];

exports.getBody = req => {
	if (req.method === "GET" || req.method === "DELETE") {
		return null
	} else if (req.headers['content-type'].startsWith('multipart/form-data')) {
		const form = new formidable.IncomingForm();
		form.uploadDir = UPLOAD_DIR
		form.multiples = true
		return new Promise((resolve, reject)=> {
			form.parse(req, (err, fields, files) => {
				if (err) {
					reject(err)
					return
				}
				resolve(files)
			})
		})
	} else if (req.headers['content-type'].startsWith('application/json')){
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
	
}

exports.hasher = (...strs) => {	
	let shasum = createHash('sha256');
  shasum.update(`${[...strs].join('')}`);
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

exports.wsAuth = ({socket, next, sessions}) => {
	let { headers } = socket.request
	let { _sid } = cookie.parse(headers['cookie'] || '');
	
  if (sessions.has(_sid)) {
    return next();
  }
  return next(new Error('authentication error'));
}

exports.cookieSetter = (req,res) => {
	console.log('cookie setter')
	let { _sid } = cookie.parse(req.headers['cookie'] || '');
	if (!_sid) {
		_sid = this.hasher(req.socket.localAddress,this.salt,new Date());
		res.setHeader('set-cookie', cookie.serialize("_sid", _sid, {
			httpOnly: true,
			expires: new Date(Date.now() + 1000* 60 * 60)
		}))
	}
	return _sid
}

exports.fsRenamePromise = (oldPath, newPath) => new Promise((resolve, reject) => {
	fs.rename(oldPath, newPath, err=>{
		if (err) reject(err)
		fs.stat(newPath, (err, stat)=>{
			if (err) reject(err)
			console.log(stat);
			resolve();
		})
	})
})