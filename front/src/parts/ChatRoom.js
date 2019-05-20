import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Input, InputGroupAddon, InputGroup, Button, ListGroup, ListGroupItem } from 'reactstrap';
import io from "socket.io-client";


let socket = io('/',{
	path:'/api/ws',
	autoConnect: false
});


const DEFAULT_ROOM = 'public';
const DEFAULT_USER = 'anonymous';


export default ({user}) => {

	const [msgs, setMsgs] = useState([]);
	const [inputMsg, setInputMsg] = useState('');
	const [toWhom, setToWhom] = useState(null);	
	
	const updateInputMsg =(e) => setInputMsg(e.target.value);
	const updateToWhom = e => setToWhom(e.currentTarget.dataset.user);
	

	const sendMsg = () => {
		if (!user) return console.error('You must login first')
		socket.emit('sendMsg', {
			from: socket.id,
			to: toWhom || DEFAULT_ROOM, 
			msg: inputMsg
		});
		setInputMsg('');
	}
	
	const initToWhom = e => {
		if (e.key === 'Escape'){
			setToWhom(null);
		} else if (e.key === 'Enter') {
			sendMsg();
		}
	};
	
	const makeListItems = (message,idx) => <ListGroupItem
		key={idx}
		data-user={message.from}
		onClick={updateToWhom}
		>
			<b>{message.from}</b>: {message.msg}
		</ListGroupItem>
	
	const updateMsgs 
		= useCallback(data=> setMsgs([data,...msgs]),[msgs]);
	
	socket
	  .off('receiveMsg')
		.on('receiveMsg',updateMsgs)
	
	useEffect(()=>{
		if (user) {
			console.log('user:',user,'login')
			socket
			  // .close()
			  .open()
			  .emit('getOldMsgs', oldMsgs => setMsgs([...oldMsgs]))
				.on('reconnecting', ()=>console.log('reconnecting'))
		} else {
			setMsgs([])
			socket.close()
		}
	},[user])
	
	return <Container fluid>
		<InputGroup>
			<Input placeholder="and..." onChange={updateInputMsg} onKeyUp={initToWhom} value={inputMsg} />
			<InputGroupAddon addonType="append">
				<Button onClick={user && sendMsg} color="secondary">Send</Button>
			</InputGroupAddon>
		</InputGroup>
		<div style={{overflow: 'auto',height: '100%'}}>
			<ListGroup>
				{msgs.map(makeListItems)}
			</ListGroup>
		</div>	
	</Container>
}