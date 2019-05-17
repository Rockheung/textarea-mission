import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, InputGroupAddon, InputGroup, Button, ListGroup, ListGroupItem } from 'reactstrap';
import io from "socket.io-client";


const socket = io('/',{
	path:'/api/ws'
})
.on('reconnecting', ()=>console.log('reconnecting'))

const DEFAULT_ROOM = 'public';
const DEFAULT_USER = 'anonymous';


export default ({user}) => {

	const [msgs, setMsgs] = useState([]);
	const [inputMsg, setInputMsg] = useState('');
	const [toWhom, setToWhom] = useState(null)
	
	socket
		.on('receiveMsg',data=> console.log(data))
				
				//setMsgs([data,...msgs])
	
	
	const sendMsg = () => {
		socket.emit('sendMsg', {
			from: socket.id,
			to: toWhom || DEFAULT_ROOM, 
			msg: inputMsg
		});
		setInputMsg('');
	}
	
	const updateInputMsg =(e) => setInputMsg(e.target.value);
	const updateToWhom = e => setToWhom(e.currentTarget.dataset.user);
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
			<b>{`${message.from}`}</b>{`: ${message.msg}`}
		</ListGroupItem>
	
	useEffect(()=>{
		if (user) {
			console.log('user:',user,'login')
			socket
			  .close()
			  .open()
		    .emit('joinRoom',socket.id);
		}
	},[user])
	
	return <div>
		You Are: <b>{user || DEFAULT_USER}</b>, and send to <b>{toWhom || DEFAULT_ROOM}</b>
		<InputGroup>
			<Input placeholder="and..." onChange={updateInputMsg} onKeyUp={initToWhom} value={inputMsg} />
			<InputGroupAddon addonType="append">
				<Button onClick={sendMsg} color="secondary">Send</Button>
			</InputGroupAddon>
		</InputGroup>
		<ListGroup>
			{msgs.map(makeListItems)}
		</ListGroup>		
	</div>
}