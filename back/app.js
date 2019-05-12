const http = require('http');

const handler = require('./ctrlr')

const app = http.createServer(handler)

app.listen(8080);