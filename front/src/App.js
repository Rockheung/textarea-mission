import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <Container>
			<Row>
				<Col sm="3">File</Col>
				<Col sm="6">Code</Col>
				<Col sm="3">Chat</Col>
			</Row>
		</Container>
  );
}

export default App;
