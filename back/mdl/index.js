const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'webCoder';

let _db = null;
// Initialize connection once
exports.connect = () => new Promise((resolve,reject) => {
		MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err) {
			reject(err)
			return
		}
		_db = client.db(dbName)
		resolve(_db)
	});
});

exports.getDB = () => {
	if (!_db) throw new Error('Checkout your db demon')
	return _db
}