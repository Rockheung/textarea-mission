const http = require('http');
const handler = require('./ctrlr');
const { connect: dbConnect } = require('./mdl');
const app = http.createServer(handler);

dbConnect()
  .then(()=>console.log("Connected successfully to server"))
	.then(()=>app.listen(8080))
  .catch((e) => {
		console.error(e);
		process.exit(1);
})