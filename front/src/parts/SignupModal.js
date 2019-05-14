import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, FormGroup } from 'reactstrap';

export default props => {
	const [modal, setModal] = useState(false);
  
  const toggle = () => setModal(!modal);

	return (
		<>
			<Button color="info" onClick={toggle}>{props.buttonLabel}</Button>
			<Modal isOpen={modal} fade={false} toggle={toggle} className={props.className}>
				<ModalHeader toggle={toggle}>Modal title</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Input type="email" name="email" placeholder="email" />
					</FormGroup>
					<FormGroup>
						<Input type="password" name="password" placeholder="password" />
					</FormGroup>
					<FormGroup>
						<Input type="password" name="re-password" placeholder="password again" />
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={toggle}>Sign in</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}