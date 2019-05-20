import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import FolderTree from './FolderTree.js';
import Editor from './Editor.js';

import FileUpload from './FileUpload.js';

export default props => {
	
	const [files, setFiles] = useState([]);
	
	useEffect(()=>{
		const sendFiles = async files => {
			if (files.length === 0) return null;
			let formFiles = new FormData();
			for (let i=0; i<files.length; i++) {
				formFiles.append(i,files[i])
			}
			
			const ops = {
				method: 'POST',
				body: formFiles
			}
			let res = await fetch('/api/file',ops)
			setFiles([])
			console.log(res)
		}
		
		sendFiles(files)
		
	},[files])
	
	return <>
		<Container fluid>
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
	</>
}