import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default props => (
	<div>ChatRoom: {props.user || 'anonymous'}</div>
)