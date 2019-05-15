
module.exports = ({io,socket,sessions}) => {
	 
	console.log('User connected', socket.rooms)
	socket
		.on('hi',(id,msg)=>{
			console.log(id, msg)
		})
	  .on('publicMsg',data=>console.log(data))
	
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
}