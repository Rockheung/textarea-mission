
module.exports = ({io,socket,sessions}) => {
	 
	console.log('User connected')
	socket
	  .join('public', ()=> {})
	  .on('joinRoom', (id) => {
		  if (sessions.has(id)) {
				socket.join(sessions.get(id))
			}			
	  })
	  .on('sendMsg',({from:socketId,to,msg})=>{
		  console.log(sessions,socketId,msg)
		  if (sessions.has(socketId)) {
				let whoSent = sessions.get(socketId);
				console.log(whoSent, to)
			  io.to(to).emit('receiveMsg',{
				  from: whoSent,
					msg
			  })
			}
		  
	})
	
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
}