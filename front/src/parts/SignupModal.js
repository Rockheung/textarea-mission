import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, FormGroup } from 'reactstrap';

export default props => {
	const [modal, setModal] = useState(false);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [repassword, setRePassword] = useState(null);
	const [fetching, setFetching] = useState(false);
	
  const toggle = () => setModal(!modal);
	const idChange = (e) => setUsername(e.target.value);
	const pwChange = (e) => setPassword(e.target.value);
	const repwChange = (e) => setRePassword(e.target.value);
	const signUp = () => setFetching(true);
	
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
		const createUser = async () => {
			try {
				const res = await fetch('/api/user', reqData)	
				if (res.status !== 201) {
					throw new Error('Sign up fail');
				}
				setModal(false)
			} catch (e) {
				console.error(e);
			}
			
			setUsername(null)
			setPassword(null)
			setRePassword(null)
			setFetching(false)
		}
		if (fetching) {
			createUser()
		}
	}, [fetching])
	
	return <>
		<Button color="info" onClick={toggle}>{props.buttonLabel}</Button>
		<Modal isOpen={modal} fade={false} toggle={toggle} className={props.className}>
			<ModalHeader toggle={toggle}>Sign Up Now</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Input type="email" name="email" placeholder="email" onChange={idChange} />
				</FormGroup>
				<FormGroup>
					<Input type="password" name="password" placeholder="password" onChange={pwChange} />
				</FormGroup>
				<FormGroup>
					<Input type="password" name="re-password" placeholder="password again" onChange={repwChange} />
				</FormGroup>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={signUp}>Sign up</Button>
			</ModalFooter>
		</Modal>
	</>
}