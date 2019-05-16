import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';
import io from "socket.io-client";

const socket = io('/',{path:'/api/ws'})


export default props => {

	const [msgs, setMsgs] = useState([]);
	const [inputMsg, setInputMsg] = useState('');
	const [toWhom, setToWhom] = useState('public')
	
	socket.on('receiveMsg',data=> setMsgs([...msgs,data]));
	
	
	const sendMsg = () => {
		socket.emit('sendMsg', {
			from: socket.id,
			to: toWhom, 
			msg: inputMsg
		});
		setInputMsg('');
	}
	
	const updateInputMsg =(e) => setInputMsg(e.target.value);
	const updateToWhom = e => setToWhom(e.currentTarget.dataset.user);
	
	// console.dir(socket)
	
	useEffect(()=>{
		if (props.user) {
			console.log('setup')
		  socket
				.emit('joinRoom',socket.id)
				
		}		
	},[props.user])
	
	return <div>
		You Are: {props.user || 'anonymous'}, and send to {toWhom}
		<InputGroup>
			<Input placeholder="and..." onChange={updateInputMsg} value={inputMsg} />
			<InputGroupAddon onClick={sendMsg} addonType="append">
				<Button color="secondary">Send</Button>
			</InputGroupAddon>
		</InputGroup>
		<ul>
			{msgs.map(message => <li
				data-user={message.from}
				onClick={updateToWhom}
				>
				{`${message.from}: ${message.msg}`}
			  </li>)}
		</ul>		
	</div>
}