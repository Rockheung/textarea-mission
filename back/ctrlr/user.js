const client = require("../mdl")
const { add } = require("../mdl/user.js")

// signup
exports.post = async (res,queryString, body) => {
	// await add(client, body)
	
	const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'webCoder2';

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    let r = await db.collection('user').insertOne(body);
    assert.equal(1, r.insertedCount);

  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();

	res.end('user post ok:'+ queryString + JSON.stringify(body))
}
