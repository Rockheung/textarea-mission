import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import FolderTree from './FolderTree.js';
import Editor from './Editor.js';

export default () => (
	<Container fluid>
		{ "File Manager"}
		<Row>
			<Col sm="4">
				<FolderTree />
			</Col>
			<Col sm="auto">
				<Editor />
			</Col>
		</Row>
	</Container>
)