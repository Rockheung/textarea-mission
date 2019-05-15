const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'webCoder';

// Initialize connection once
module.exports = async () => {
	let client = new MongoClient(url, { useNewUrlParser: true });
	try {
		await client.connect();
		return client.db(dbName);
	} catch (e) {
		throw e
	}
};