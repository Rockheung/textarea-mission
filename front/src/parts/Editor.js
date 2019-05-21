import React from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';

export default ({user, path, text, setText, saveFn}) => {
	
	const updateText = e => setText(e.target.value)
	const saveText = () => saveFn(path,text);
	return <div>
		<Button onClick={saveText}>Save</Button><span>{path}</span>
		<Input type={"textarea"} value={text || ''} onChange={updateText} disabled={!text}></Input>
	</div>
}