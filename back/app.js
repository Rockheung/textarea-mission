const http = require('http');
const handler = require('./ctrlr');
const dbConnect = require('./mdl');
const createSocketIO = require('socket.io');
const wsHandler = require('./ctrlr/ws.js')

const sessions = {}


dbConnect()
	.then(db=> {
		const app = http.createServer((req,res)=>handler({req,res,db,sessions}))
		const io = createSocketIO(app,{path:'/api/ws'})
	  app.listen(8080);
	  io.on('connection', socket=>wsHandler({io,socket, sessions}));
  })
  .then(()=>console.log("Connected successfully"))
  .catch((e) => {
		console.error(e.stack);
		process.exit(1);
})