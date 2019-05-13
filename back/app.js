const http = require('http');
const handler = require('./ctrlr');
const { connect: dbConnect } = require('./mdl');
const app = http.createServer(handler);

dbConnect()
  .then(()=>console.log("Connected successfully to server"))
	.then(()=>app.listen(8080))
  .catch((e) => {
		console.error(e);
		// Always hard exit on a database connection error
		process.exit(1);
})