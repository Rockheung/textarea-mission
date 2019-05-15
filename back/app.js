const http = require('http');
const handler = require('./ctrlr');
const dbConnect = require('./mdl');
const createSocketIO = require('socket.io');
const wsHandler = require('./ctrlr/ws.js');
const { hasher } = require('./lib/util.js');
const cookie = require('cookie');

const sessions = {}

const socketIoOps = {
	path: '/api/ws',
	cookie: '_sid',
	cookiePath: '/api'
}

const customGenerateId = ({req,gen}) => {
		let _hash = gen(req)
		let { _sid } = cookie.parse(req.headers['cookie'] || '');
		return _sid || hasher(new Date(),_hash);
	}

dbConnect()
	.then(db=> {
		const app = http.createServer((req,res)=>handler({req,res,db,sessions}))
		const io = createSocketIO(app,socketIoOps)
		let _genId = io.engine.generateId
		io.engine.generateId = req => customGenerateId({req,gen:_genId})
	  io.on('connection', socket=>wsHandler({io,socket, sessions}));
	  app.listen(8080);
  })
  .then(()=>console.log("Connected successfully"))
  .catch((e) => {
		console.error(e.stack);
		process.exit(1);
})