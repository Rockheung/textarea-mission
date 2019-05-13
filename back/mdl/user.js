const assert = require('assert');

exports.add = async ({db, data}) => {
	// console.log(db)
	try {
		let r = await db.collection('user').insertOne(data)
		assert.equal(1, r.insertedCount);
	} catch (e) {
		console.log(e.stack)
	}
	
	// console.log(data)
}