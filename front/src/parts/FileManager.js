import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import FolderTree from './FolderTree.js';
import Editor from './Editor.js';

import FileUpload from './FileUpload.js';

export default props => {
	
	const [files, setFiles] = useState([]);
	
	return <Container fluid>
		{ "File Manager"}
		<Row>
			<Col sm="4">
				<FileUpload
					setFiles={setFiles}
				/>
				<FolderTree />
			</Col>
			<Col sm="8">
				<Editor />
			</Col>
		</Row>
	</Container>
}