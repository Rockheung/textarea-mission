import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import {
	NavBar,
	FileManager,
	ChatRoom
} from './parts';
// import logo from './logo.svg';
import styles from './App.module.scss';


console.log(styles)

function App() {
	const [user, setUser] = useState(null);
	
  return <>
		<NavBar
			user={user}
			setUser={setUser}
		/>
		<Container fluid>
			<Row>
				<Col sm="9">
					<FileManager
						user={user}
					/>
				</Col>
				<Col sm="3">
					<ChatRoom
						user={user}
					/>
				</Col>
			</Row>
		</Container>
	</>
}

export default App;
