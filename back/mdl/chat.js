const assert = require('assert');
const { ObjectID } = require('mongodb')

const DEFAULT_ROOM = 'public';


exports.saveChat = async ({db, data}) => {
	try {
		// let { userUid, userChatMsgs } = await this.getChat({db, data: msgData})
		await db.collection('chats').insertOne(data)
	} catch (e) {
		console.error(e.stack)
	}
}

exports.getChats = async ({db, data}, returnCb) => {
	try {
		let user = await db.collection('users').findOne({username: data.to})
		assert(user, 'User unknown')
		let query = { $or: 
			[ 
				{ to: DEFAULT_ROOM }, 
				{ to: user.username }, 
				{ from: user.username }
			]
		}
		let msgs =await db.collection('chats').find(query).sort({$natural:-1}).toArray()
		returnCb( msgs.map(item=>({...item, _id: undefined})))
	} catch (e) {
		console.error(e.stack)
	}
}