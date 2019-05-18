const assert = require('assert');
const { hasher, salt } = require("../lib/util.js")

exports.addUser = async ({db, data: rawData}) => {
	// console.log(db)
	try {
		let data = {...rawData, ...{password: hasher(rawData.password,salt), chat_msgs:[]}}
		assert(data.hasOwnProperty('username'), 'No username in body');
		assert(rawData.username, 'username is falsy');
		assert(data.hasOwnProperty('password'), 'No password in body');
		assert(rawData.password, 'password is falsy');
		let isExist = await db.collection('users').findOne({username:data.username})
		assert(!isExist, `username: ${data.username} already exists`)
		let r = await db.collection('users').insertOne(data);
		assert.equal(1, r.insertedCount);
	} catch (e) {
		console.error(e.stack, rawData)
		throw e
	}
}