
 module.exports = ({io,socket,sessions}) => {
  console.log('User connected')
	socket
		.on('hi',(id,msg)=>{
			console.log(id, msg)
		})
	  .on('sendMsg',data=>console.log(data))
	
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
}