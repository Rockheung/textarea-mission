const assert = require('assert');
const { ObjectID } = require('mongodb')


exports.saveChat = async ({db, data: msgData}) => {
	try {
		let { userUid, userChatMsgs } = await this.getChat({db, data: msgData})
		await db.collection('users').updateOne({_id:ObjectID(userUid)},{$set: { chat_msgs:[msgData,...userChatMsgs]}})
	} catch (e) {
		console.error(e.stack)
	}
}

exports.getChat = async ({db, data: msgData}) => {
	try {
		let users = await db.collection('users').find({username:msgData.to})
		assert(user, 'User unknown')
		return { userUid: user._id, userChatMsgs: user.chat_msgs }
	} catch (e) {
		console.error(e.stack)
	}
}