import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import io from "socket.io-client";

export default props => {
	/* msgs:
	 * [{
	 *    who: username,
	 *    msg: words,
	 *    private: bool
	 * }]
	 */
	const [msgs, setMsgs] = useState([]);
	let inputMsg = null;
	const socket = io()
				.on('connect',()=>{})
				.on('msg',data=>setMsgs([...msgs,data]));
	
	const sendMsg = () => {
		socket.emit('sendMsg', inputMsg);
		inputMsg = null;
	}
	const updateInputMsg =(e) => inputMsg = e.target.value;
	
	// console.dir(socket)
	
	// useEffect(()=>{
	// })
	
	return <div>
		<ul>
			{msgs.map(msg=><li key>{msg.toString()}</li>)}
		</ul>
		<input onChange={updateInputMsg}></input>
		<button onClick={sendMsg}>Say hi</button>
		ChatRoom: {props.user || 'anonymous'}
	</div>
}