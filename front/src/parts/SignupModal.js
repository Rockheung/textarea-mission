import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, FormGroup } from 'reactstrap';

export default class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <>
        <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
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
            <Button color="primary" onClick={this.toggle}>Sign in</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}