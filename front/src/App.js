import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import {
	WebCoderNavBar,
	FileManager,
	ChatRoom
} from './parts';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
		<>
			<WebCoderNavBar />
			<Container fluid>
				<Row>
					<Col sm="9">
						<FileManager />
					</Col>
					<Col sm="3">
						<ChatRoom />
					</Col>
				</Row>
			</Container>
		</>
  );
}

export default App;
