const { saveChat, getChats } = require('../mdl/chat.js');


module.exports = ({io,socket,sessions,db}) => {
	socket
	  .join('public', ()=> {
		  if (sessions.has(socket.id)) {
				console.log('User connected:', socket.id, sessions);
				socket.join(sessions.get(socket.id));
			}
  	})
	  .on('sendMsg',({from:socketId,to,msg})=>{
		  if (sessions.has(socketId)) {
				console.log(sessions)
				let whoSent = sessions.get(socketId);
				let data = { from: whoSent, to, msg }	  
				io.to(to).to(whoSent).emit('receiveMsg',data)
				// socket.emit('receiveMsg',data)
				saveChat({db,data})
			}
		})
	  .on('getOldMsgs', getMsgFunc => {
		  // getOldMsgs('hello')
			if (sessions.has(socket.id)) {
				let data = { to: sessions.get(socket.id) }
				getChats({db,data}, getMsgFunc)
			}
	  })
	
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
}