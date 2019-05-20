import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import FolderTree from './FolderTree.js';
import Editor from './Editor.js';

import FileUpload from './FileUpload.js';

export default ({user}) => {
	
	const [files, setFiles] = useState([]);
	
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
		let res = await fetch('/api/file', ops)
		setFiles([])
		console.log(res)
	}
	
	const refreshFiles = async (path = '/')=>{
		path = path.replace(/\.\./g,'').replace(/\/+/g,'/')
		const ops = {
			method: 'GET'
		}
		const query = new URLSearchParams();
		query.set('path', path)
		let res = await fetch(`/api/file?${query.toString()}`, ops)
		let json = await res.json();
		console.log(json.fileList)
		return json.fileList
	}
	
	useEffect(()=>{
		console.log('effect')
		sendFiles(files)
		refreshFiles()
		
	},[files])
	
	return <>
		<Container fluid>
			<Row>
				<Col sm="4">
					<FileUpload
						setFiles={setFiles}
					/>
					<FolderTree 
						user={user}
					/>
				</Col>
				<Col sm="8">
					<Editor 
						user={user}
					/>
				</Col>
			</Row>
		</Container>
	</>
}