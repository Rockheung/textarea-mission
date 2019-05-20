import React from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';

export default ({path, text, save}) => {
	return <div>
		<Button>Save</Button>
		<Input type={"textarea"} value={text}></Input>
	</div>
}