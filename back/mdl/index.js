const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'webCoder';

let _db = null;
// Initialize connection once
exports.connect = async () => {
	let client = new MongoClient(url, { useNewUrlParser: true });
	try {
		await client.connect()
		_db = client.db(dbName)
	} catch (e) {
		throw e
	}
};

exports.getDB = () => {
	if (!_db) throw new Error('Checkout your db demon')
	return _db
}