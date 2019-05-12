const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'webCoder';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect((err) => {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	const db = client.db(dbName);

	client.close();
});

client.connect((err) => {
	assert.equal(null, err);
	console.log("Connected successfully to server2");

	const db = client.db(dbName);

	client.close();
});

client.connect((err) => {
	assert.equal(null, err);
	console.log("Connected successfully to server3");

	const db = client.db(dbName);

	client.close();
});

module.exports = client