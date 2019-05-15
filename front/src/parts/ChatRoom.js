import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';
import io from "socket.io-client";

const socket = io('/',{path:'/api/ws'});

export default props => {
	/* msgs:
	 * [{
	 *    who: username,
	 *    msg: words,
	 *    private: bool
	 * }]
	 */
	const [msgs, setMsgs] = useState([]);
	const [inputMsg, setInputMsg] = useState(null);
	
	
	const sendMsg = () => {
		socket.emit('publicMsg', inputMsg);
		setInputMsg(null);
	}
	const updateInputMsg =(e) => setInputMsg(e.target.value);
	
	// console.dir(socket)
	
	useEffect(()=>{
		socket
			.on('connect',()=>console.log(socket.id, "connected"))
			.on('msg',data=>setMsgs([...msgs,data]));
	},[])
	
	return <div>
		<ul>
			{msgs.map(msg=><li key>{msg.toString()}</li>)}
		</ul>
		<InputGroup>
			<Input placeholder="and..." onChange={updateInputMsg} />
			<InputGroupAddon onClick={sendMsg} addonType="append">
				<Button color="secondary">Send</Button>
			</InputGroupAddon>
		</InputGroup>
		ChatRoom: {props.user || 'anonymous'}
	</div>
}