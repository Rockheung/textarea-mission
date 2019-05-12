const assert = require('assert');


exports.add = async (client, data) => {
	try {
		await client.connect();
		console.log('user client connected')
		const db = client.db('webCoder')
		let r = await db.collection('user').insertOne(data)
		assert.equal(1, r.insertedCount);
	} catch (e) {
		console.log(e.stack)
	}
	
	console.log(data)
	client.close()
}