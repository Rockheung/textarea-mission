const http = require('http');

const handler = require('./src')

const app = http.createServer(handler)

app.listen(8080);