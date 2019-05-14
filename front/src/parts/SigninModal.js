import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, FormGroup } from 'reactstrap';

import SignupModal from './SignupModal.js';

export default props => {
	const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
	return (
		<>
			<Button color="danger" onClick={toggle}>{props.buttonLabel}</Button>
			<Modal isOpen={modal} fade={false} toggle={toggle} className={props.className}>
				<ModalHeader toggle={toggle}>Modal title</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Input type="email" name="email" id="exampleEmail" placeholder="email" />
					</FormGroup>
					<FormGroup>
						<Input type="password" name="password" id="examplePassword" placeholder="password" />
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={toggle}>Sign in</Button>
					<SignupModal buttonLabel="Sign up"/>
				</ModalFooter>
			</Modal>
		</>
	);
}