const path = require('path');
const fs = require('fs');
const tar = require('tar-fs');
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
				let i = 0;
				let incommingFiles = []
				while(files[i]) {
					incommingFiles = [...incommingFiles,files[i++]]
				}
				resolve(incommingFiles)
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
	} else if (req.headers['content-type'].startsWith('text/plain')) {
		return new Promise((resolve, reject)=> {
		let body = [];
		req
		  .on('error', err => reject(err))
			.on('data', chunk => body.push(chunk))
			.on('end', () => {
			  body = Buffer.concat(body).toString();
				resolve(body)
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
	let { _sid } = cookie.parse(req.headers['cookie'] || '');
	if (!_sid) {
		console.log('cookie re-generated')
		_sid = this.hasher(req.socket.localAddress,this.salt,new Date());
		res.setHeader('set-cookie', cookie.serialize("_sid", _sid, {
			httpOnly: true,
			expires: new Date(Date.now() + 1000* 60 * 60)
		}))
	}
	return _sid
}

exports.fsRenamePromise = (oldPath, newPath) => new Promise((resolve, reject) => {
	fs.stat(newPath, (err, stat)=>{
		if (!err) {
			fs.unlink(oldPath, err=> {
				if (err) console.log(new Error('Error occured when removing temp files'))
			})
			reject(new Error('File exists: '+ path.basename(newPath)))
		} else if (err.errno === -2) {
			fs.rename(oldPath, newPath, err=>{
				if (err) {
					reject(err)
					return
				}
				fs.stat(newPath, (err,stat)=>{
					if (err) {
						reject(err)
						return
					}
					resolve(stat)
				})
			})
		}
	})
})

exports.fsStatPromise = path => new Promise((resolve,reject) => {
	fs.stat(path, (err,stat)=>{
		if (err && err.errno === -2) {
			resolve(null)
			return
		} else if (err) {
			reject(err)
			return
		}
		resolve(stat)
	})
})

exports.fsReadDirPromise = path => new Promise((resolve,reject) => {
	fs.readdir(path, (err,files)=>{
		if (err) {
			reject(err)
			return
		}
		resolve(files)
	})
})

exports.fsReadFilePromise = path => new Promise((resolve,reject) => {
	fs.readFile(path, 'utf8', (err,data)=>{
		if (err) {
			reject(err)
			return
		}
		resolve(data)
	})
})

exports.urlCleaner = path => path
	.replace(/\.\./g,'')
	.replace(/\/+/g,'/')
	.replace(/\.\//g,'')
	.replace(/.\/$/g,'')

exports.fsWriteFilePromise = (path, text)=> new Promise((resolve,reject) =>{
	fs.writeFile(path, text, 'utf8', (err) => {
		if (err) {
			reject(err)
			return
		}
		resolve()
  })
})

exports.fsUnTarPromise = tarPath => new Promise((resolve,reject) => {
  if (path.extname(tarPath) !== '.tar') {
		reject(new Error('Maybe not tar file'))
	}
	let readStream = fs.createReadStream(tarPath);
	readStream.pipe(tar.extract(path.dirname(tarPath)), {end:false});
	readStream.on('end', resolve)	
})


exports.textExts = new Set([
	'.txt','.c','.js','.log','.html','.css','.ini', '.md'
]);

exports.isText = filePath => this.textExts.has(path.extname(filePath));