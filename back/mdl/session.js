const assert = require('assert');
const { ObjectId } = require('mongodb');
const { hasher, salt } = require("../lib/util.js")

exports.signIn = async ({db, data:rawData, sessions}) => {
	// console.log(db)
	let incomingData = null,
			userData = null;
	try {
		assert(rawData.hasOwnProperty('username'), 'No username in body');
		assert(rawData.hasOwnProperty('password'), 'No password in body');
		incomingData = {...rawData, ...{password: hasher(rawData.password, salt)}}
		userData = await db.collection('users').findOne({username:incomingData.username})
		assert(userData, `username: ${incomingData.username} You must sign up first`)
		assert.equal(userData.password, incomingData.password, 'Password not match')
		
		// console.log(rawData.sessionID)
		sessions[rawData.sessionID] = userData.username
		console.log(sessions)
	} catch (e) {
		console.log(e.stack, userData, incomingData)
		throw e;
	}
}

exports.signOut = async ({db, data}) => {
	// console.log(db)
	try {
		assert(data.hasOwnProperty('username'), 'No username in body');
		assert(data.hasOwnProperty('password'), 'No password in body');
		let isExist = await db.collection('users').findOne({username:data.username})
		assert(!isExist, `username: ${data.username} already exists`)
		let r = await db.collection('users').insertOne(data);
		assert.equal(1, r.insertedCount);
	} catch (e) {
		console.log(e.stack, data)
	}
}

exports.sessionBag;