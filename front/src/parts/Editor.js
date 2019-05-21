import React from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';

export default ({path, text, setText, save}) => {
	
	const updateText = e => setText(e.target.value)
	return <div>
		<Button>Save</Button>
		<Input type={"textarea"} value={text} onChange={updateText}></Input>
	</div>
}