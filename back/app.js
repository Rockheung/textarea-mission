const http = require('http');
const handler = require('./ctrlr');
const dbConnect = require('./mdl');
const createSocketIO = require('socket.io');
const wsHandler = require('./ctrlr/ws.js');
const { getKeysFromValue, customGenerateId, wsAuth } = require('./lib/util.js');

const sessions = new Map();

// sessions.getSidsFromUsername = getKeysFromValue

const socketIoOps = {
	path: '/api/ws',
	cookie: false
}

dbConnect()
	.then(db => {
		const app = http.createServer((req,res)=>handler({req,res,db,sessions}))
		const io = createSocketIO(app,socketIoOps)
		io.use((socket,next)=>wsAuth({socket,next,sessions}));
		io.engine.generateId = customGenerateId(io.engine.generateId)
	  io.on('connection', socket=>wsHandler({io,socket, sessions, db}));
	  app.listen(8080);
  })
  .then(()=>console.log("Server started successfully."))
  .catch((e) => {
		console.error(e.stack);
		process.exit(1);
})