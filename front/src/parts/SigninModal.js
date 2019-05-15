import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, FormGroup } from 'reactstrap';

import SignupModal from './SignupModal.js';

export default props => {
	const [modal, setModal] = useState(false);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [fetching, setFetching] = useState(true);
	
  const toggle = () => setModal(!modal);
	const idChange = (e) => setUsername(e.target.value);
	const pwChange = (e) => setPassword(e.target.value);
	const signIn = () => setFetching(true);
	
	useEffect(()=>{
		const reqData = {
			method: 'POST',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username, password
			})
		}
		const getSession = async () => {
			try {
				const res = await fetch('/api/session', reqData)	
				if (res.status !== 200) {
					throw new Error('Sign in fail');
				}
				const { youAre } = await res.json();
				props.signIn(youAre || username)
				setModal(false)
			} catch (e) {
				console.error(e);
			}
			
			setUsername(null)
			setPassword(null)
			setFetching(false)
		}
		if (fetching) {
			getSession()
		}
	}, [fetching])
	
	return <>
		<Button color="danger" onClick={toggle}>{props.buttonLabel}</Button>
		<Modal isOpen={modal} fade={false} toggle={toggle} className={props.className}>
			<ModalHeader toggle={toggle}>Sign In</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Input type="email" name="email" id="exampleEmail" placeholder="email" onChange={idChange} />
				</FormGroup>
				<FormGroup>
					<Input type="password" name="password" id="examplePassword" placeholder="password" onChange={pwChange} />
				</FormGroup>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={signIn}>Sign in</Button>
				<SignupModal buttonLabel="Sign up"/>
			</ModalFooter>
		</Modal>
	</>
}