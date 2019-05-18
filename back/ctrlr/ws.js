const { saveChat } = require('../mdl/chat.js');


module.exports = ({io,socket,sessions,db}) => {
	socket
	  .join('public', ()=> console.log('User connected:', socket.id, sessions))
	  .on('joinRoom', (id) => {
		  if (sessions.has(id)) {
				socket.join(sessions.get(id))
			}			
	  })
	  .on('sendMsg',({from:socketId,to,msg})=>{
		  if (sessions.has(socketId)) {
				let whoSent = sessions.get(socketId);
				let data = { from: whoSent, to, msg }	  
			  io.to(to).emit('receiveMsg',data)
				saveChat({db,data})
			}
		  
	})
	
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
}