const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'webCoder';

let _db = null;
// Initialize connection once
// 더 좋은 방법으로는 module.exports = client를 하여 ctrlr/index.js의 handler을 통해 db를 전달하는 방법이 있을 것 같습니다.
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